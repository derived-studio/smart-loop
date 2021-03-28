import { isBrowser } from './environment'
import { nextRenderFrame, nextUpdateFrame } from './frames'
import { ILoop, LoopUpdateProps, LoopOptions, UpdateFunction, LoopGenerator, LoopStatus } from './smart-loop.types'
import { getHRTime } from './time'

export class SmartLoop implements ILoop {
  private _updateLoop: LoopGenerator | null
  private _renderLoop: LoopGenerator | null
  private _status: LoopStatus
  private _duration: number

  public rate: number
  public fixedRate: number

  private render?: UpdateFunction
  private update?: UpdateFunction
  private fixedUpdate?: UpdateFunction

  constructor(opts: LoopOptions) {
    const { render, update, fixedUpdate, rate = 50, fixedRate = 60, duration = 0 } = opts

    this.validateOptions(opts)

    this.rate = rate
    this.fixedRate = fixedRate
    this._duration = duration

    this._status = LoopStatus.Ready

    if (update) {
      this.update = update
    }

    if (fixedUpdate) {
      this.fixedUpdate = fixedUpdate
    }

    if (render) {
      this.render = render
    }
  }

  public set status(val: LoopStatus) {
    this._status = val
  }

  public get status(): LoopStatus {
    return this._status
  }

  public get isRunning(): boolean {
    return this._status === LoopStatus.Running
  }

  public get isStopped(): boolean {
    return this._status === LoopStatus.Stopped
  }

  public get isDone(): boolean {
    return this._status === LoopStatus.Done
  }

  public get isPaused(): boolean {
    return this._status === LoopStatus.Paused
  }

  public pause(): void {
    this.status = LoopStatus.Paused
  }

  public resume(): void {
    if (this.isDone || this.isStopped) {
      console.warn("Can't resume. Loop has been stopped or has finished. Start new loop.")
    }

    if (!this.isPaused) {
      return
    }
    this.start()
  }

  public start(): void {
    if (this.render) {
      if (!this._renderLoop) {
        this._renderLoop = this.generateRenderLoop()
      }
      if (!this.isRunning) {
        this.status = LoopStatus.Running
      }
      this.runLoop(this._renderLoop, this.render)
    }

    if (this.update || this.fixedUpdate) {
      if (!this._updateLoop) {
        this._updateLoop = this.generateUpdateLoop()
      }
      if (!this.isRunning) {
        this.status = LoopStatus.Running
      }
      this.runLoop(this._updateLoop, this.update, this.fixedUpdate)
    }
  }

  public stop(): void {
    this.status = LoopStatus.Stopped
    this._renderLoop = null
    this._updateLoop = null
  }

  private async *generateRenderLoop() {
    const { _duration: duration } = this

    const startTime = await nextRenderFrame()

    let totalTime = 0
    let updateTime = startTime
    let frame = 0

    while (!duration || updateTime - startTime < duration) {
      let deltaTime = 0

      const frameTime = await nextRenderFrame()
      const frameDelta = frameTime - updateTime

      updateTime = frameTime
      totalTime += frameDelta
      deltaTime += frameDelta

      frame += 1
      yield {
        frame,
        deltaTime,
        totalTime,
        updateTime
      }
    }

    if (duration && updateTime - startTime >= duration) {
      this._status === LoopStatus.Done
    }
  }

  private async *generateUpdateLoop() {
    const { rate, _duration: duration, fixedRate } = this
    const updateFrameTime = rate > 0 ? 1000 / rate : 0
    const fixedFrameTime = fixedRate > 0 ? 1000 / rate : 0
    const startTime = getHRTime()

    let frame = 1
    let fixedFrame = 1
    let totalTime = 0
    let updateTime = startTime
    let deltaTime = 0
    let fixedDeltaTime = 0
    while (!duration || updateTime - startTime < duration) {
      const frameTime = await nextUpdateFrame()
      const frameDelta = frameTime - updateTime

      updateTime = frameTime
      totalTime += frameDelta
      deltaTime += frameDelta
      fixedDeltaTime += frameDelta

      if (this.fixedUpdate && fixedDeltaTime > fixedFrameTime) {
        yield {
          frame: fixedFrame,
          deltaTime: fixedFrameTime,
          totalTime,
          updateTime,
          fixed: true
        }
        fixedFrame += 1
        fixedDeltaTime = 0
      }

      if (this.update && deltaTime > updateFrameTime) {
        yield {
          frame,
          deltaTime,
          totalTime,
          updateTime
        }
        frame += 1
        deltaTime = 0
      }
    }
  }

  private validateOptions(props: LoopOptions) {
    const { render, rate, update, fixedRate, fixedUpdate } = props
    if (render && !isBrowser) {
      throw new Error("Render loop can't be run outside of browser environment. Use update() instead")
    }

    if (update && rate <= 0) {
      throw new Error(`Invalid rate value: ${rate}. If defined it must be greater than zero.`)
    }

    if (fixedUpdate && fixedRate <= 0) {
      throw new Error(`Invalid fixedRate value ${fixedRate}. If defined it must be greater than zero.`)
    }

    if (!fixedUpdate && !update && !render) {
      throw new Error('Ivanlid options due to missing render method.')
    }
  }

  private async runLoop(loop: LoopGenerator, update: UpdateFunction, fixedUpdate?: UpdateFunction) {
    this.status = LoopStatus.Running
    const { done, value } = await loop.next()

    if (done || !value) {
      return
    }

    if (!this.isRunning) {
      return
    }

    const updateFn = value.fixed ? fixedUpdate : update
    updateFn(value as LoopUpdateProps)
    this.runLoop(loop, update, fixedUpdate)
  }
}
