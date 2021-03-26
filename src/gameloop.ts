import { nextDrawFrame } from './frames'
import {
  IGameLoop,
  GameLoopStats,
  GameLoopGeneratorProps,
  GeneratorYield,
  GameLoopConstructorOptions,
  UpdateFunction
} from './gameloop.types'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export class GameLoop implements IGameLoop {
  private _loop: AsyncGenerator<GeneratorYield, void, unknown> | null

  private _stats: GameLoopStats
  public get stats(): GameLoopStats {
    return Object.freeze(this.createStats(this._stats))
  }

  private update: UpdateFunction
  private fixedUpdate: UpdateFunction

  constructor(props: GameLoopConstructorOptions) {
    const { update = noop, fixedUpdate = noop, rate, fixedRate, duration } = props
    this._stats = this.createStats({ rate, fixedRate, duration })
    this.update = update
    this.fixedUpdate = fixedUpdate
    this.createIt()
  }

  createStats(stats: Partial<GameLoopStats> = {}): GameLoopStats {
    return {
      created: Date.now(),
      gameTime: 0,
      updates: 0,
      rate: 60,
      fixedUpdates: 0,
      fixedRate: 50,
      lastUpdate: 0,
      lastFixedUpdate: 0,
      running: false,
      paused: false,
      ...stats
    }
  }

  private async *generateLoop(props: GameLoopGeneratorProps) {
    const { duration, rate } = props

    // todo: validate rate and fixed rate are not 0
    const frameTime = 1000 / rate
    const startTime = await nextDrawFrame()
    let updateTime = startTime

    while (!duration || updateTime - startTime < duration) {
      let deltaTime = 0

      while (deltaTime < frameTime) {
        const stepTime = await nextDrawFrame()
        const stepDelta = stepTime - updateTime

        deltaTime += stepDelta
        updateTime += stepDelta
      }
      yield {
        deltaTime,
        gameTime: updateTime - startTime
      }
    }
  }

  private createIt() {
    this._loop = this.generateLoop(this.createStats())
  }

  private async runIt() {
    if (!this._loop) {
      return
    }
    this._stats.running = true

    const { done, value } = await this._loop.next()
    if (!this._loop || !this._stats.running) {
      return
    }
    this.update({ ...this.stats, ...value })

    if (!done) {
      await this.runIt()
    }
  }

  public start(): void {
    if (!this._loop) {
      return
    }
    this.runIt()
  }

  public stop(): void {
    this._loop = null
  }

  public pause(): void {
    this._stats.running = false
  }

  public resume(): void {
    const { running } = this.stats
    this._loop && !running && this.runIt()
  }

  public restart(): void {
    this.createIt()
    this.runIt()
  }
}
