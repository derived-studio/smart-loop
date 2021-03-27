import { isBrowser } from './environment'
import { nextRenderFrame, nextUpdateFrame } from './frames'
import { IGameLoop, LoopUpdateProps, LoopOptions, UpdateFunction, LoopGenerator } from './gameloop.types'
import { getHRTime } from './time'

export class GameLoop implements IGameLoop {
  private updateLoop: LoopGenerator | null
  private renderLoop: LoopGenerator | null
  private paused = false
  private status = false
  public rate = 60
  public fixedRate = 50
  private duration = 0

  private render?: UpdateFunction
  private update?: UpdateFunction
  private fixedUpdate?: UpdateFunction

  constructor(opts: LoopOptions) {
    const { render, update, fixedUpdate, rate, fixedRate, duration } = opts

    this.validateOptions(opts)

    this.rate = rate
    this.fixedRate = fixedRate
    this.duration = duration

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

  public get isPaused(): boolean {
    return this.paused
  }

  public pause(): void {
    this.paused = true
  }

  public resume(): void {
    if (!this.updateLoop || !this.paused) {
      return
    }

    this.paused = false
    this.start()
  }

  public start(): void {
    if (this.render) {
      if (!this.renderLoop) {
        this.renderLoop = this.generateRenderLoop()
      }
      this.runLoop(this.renderLoop, this.render)
    }

    if (this.update || this.fixedUpdate) {
      if (!this.updateLoop) {
        this.updateLoop = this.generateUpdateLoop()
      }
      this.runLoop(this.updateLoop, this.update, this.fixedUpdate)
    }
  }

  public stop(): void {
    this.status = true
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
  }
  private async *generateUpdateLoop() {
    const { rate, duration } = this
    const renderFrameTime = rate > 0 ? 1000 / rate : 0
    const startTime = getHRTime()

    let totalTime = 0
    let updateTime = startTime
    let frame = 0

    while (!duration || updateTime - startTime < duration) {
      let deltaTime = 0

      while (deltaTime < renderFrameTime) {
        const frameTime = await nextUpdateFrame()
        const frameDelta = frameTime - updateTime

        updateTime = frameTime
        totalTime += frameDelta
        deltaTime += frameDelta
      }

      frame += 1
      yield {
        frame,
        deltaTime,
        totalTime,
        updateTime
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
  }

  private async runLoop(loop: LoopGenerator, update: UpdateFunction, fixedUpdate?: UpdateFunction) {
    const { done, value } = await loop.next()

    if (done || !value) {
      this.status = true
      return
    }

    if (this.status || this.paused) {
      return
    }

    const updateFn = value.fixed ? fixedUpdate : update
    updateFn(value as LoopUpdateProps)

    await nextUpdateFrame()
    this.runLoop(loop, update, fixedUpdate)
  }
}
