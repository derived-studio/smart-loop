import { isBrowser } from './environment'
import { nextRenderFrame, nextUpdateFrame } from './frames'
import { ILoop, LoopUpdateProps, LoopOptions, UpdateFunction, LoopGenerator, LoopStatus } from './smart-loop.types'
import { getHRTime } from './time'

export class SmartLoop implements ILoop {
  private updateLoop: LoopGenerator | null
  private renderLoop: LoopGenerator | null
  private _status: LoopStatus
  public rate: number
  public fixedRate: number
  private duration: number

  private render?: UpdateFunction
  private update?: UpdateFunction
  private fixedUpdate?: UpdateFunction

  constructor(opts: LoopOptions) {
    const { render, update, fixedUpdate, rate = 50, fixedRate = 60, duration = 0 } = opts

    this.validateOptions(opts)

    this.rate = rate
    this.fixedRate = fixedRate
    this.duration = duration

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
      if (!this.renderLoop) {
        this.renderLoop = this.generateRenderLoop()
      }
      if (!this.isRunning) {
        this.status = LoopStatus.Running
      }
      this.runLoop(this.renderLoop, this.render)
    }

    if (this.update || this.fixedUpdate) {
      if (!this.updateLoop) {
        this.updateLoop = this.generateUpdateLoop()
      }
      if (!this.isRunning) {
        this.status = LoopStatus.Running
      }
      this.runLoop(this.updateLoop, this.update, this.fixedUpdate)
    }
  }

  public stop(): void {
    this.status = LoopStatus.Stopped
    this.updateLoop = null
  }

  private async *generateRenderLoop() {
    const { duration } = this

    const startTime = getHRTime()

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
    const { rate, duration, fixedRate } = this
    const updateFrameTime = rate > 0 ? 1000 / rate : 0
    const fixedFrameTime = fixedRate > 0 ? 1000 / rate : 0
    const startTime = getHRTime()

    let frame = 0
    let fixedFrame = 0
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
        fixedFrame += 1
        fixedDeltaTime = 0
        yield {
          frame: fixedFrame,
          deltaTime: fixedFrameTime,
          totalTime,
          updateTime,
          fixed: true
        }
      }

      if (this.update && deltaTime > updateFrameTime) {
        frame += 1
        deltaTime = 0
        yield {
          frame,
          deltaTime,
          totalTime,
          updateTime
        }
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
