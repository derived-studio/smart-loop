import { nextDrawFrame } from './frames'
import { IGameLoop, LoopUpdateProps, GameLoopProps, UpdateFunction } from './gameloop.types'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export class GameLoop implements IGameLoop {
  private loop: AsyncGenerator<LoopUpdateProps, void, unknown> | null
  private paused = false
  public rate = 60
  public fixedRate = 50
  private duration = 0

  private update: UpdateFunction
  private fixedUpdate: UpdateFunction

  public get isPaused(): boolean {
    return this.paused
  }

  constructor(props: GameLoopProps) {
    const { update = noop, fixedUpdate = noop, rate, fixedRate, duration } = props
    this.rate = rate
    this.fixedRate = fixedRate
    this.duration = duration
    this.update = update
    this.fixedUpdate = fixedUpdate
  }

  private async *generateLoop() {
    const { rate, duration } = this
    const renderFrameTime = rate > 0 ? 1000 / rate : 0
    // const fixedFrameTime = fixedRate > 0 ? 1000 / fixedRate : 0
    const startTime = await nextDrawFrame()

    let gameTime = 0
    let updateTime = startTime
    let renderFrame = 0
    // let fixedFrame = 0

    while (!duration || updateTime - startTime < duration) {
      let deltaTime = 0 // messure delta
      while (deltaTime < renderFrameTime) {
        const frameTime = await nextDrawFrame() // todo: should be nextupdatetime
        const frameDelta = frameTime - updateTime

        updateTime = frameTime
        gameTime += frameDelta
        deltaTime += frameDelta
      }

      renderFrame += 1
      yield {
        frame: renderFrame,
        deltaTime,
        gameTime
      }
    }
  }

  private async runIt() {
    if (!this.loop) {
      return
    }

    const { done, value } = await this.loop.next()

    if (!this.loop || done || this.paused) {
      return
    }

    this.update(value as LoopUpdateProps)
    await this.runIt()
  }

  public start(): void {
    if (this.loop) {
      return
    }
    this.loop = this.generateLoop()
    this.runIt()
  }

  public stop(): void {
    this.loop = null
  }

  public pause(): void {
    this.paused = true
  }

  public resume(): void {
    if (!this.loop || !this.paused) {
      return
    }

    this.paused = false
    this.runIt()
  }
}
