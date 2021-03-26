import { nextDrawFrame } from './frames'
import { IGameLoop, IGameLoopStats, GeneratorYield, GameLoopConstructorOptions, UpdateFunction } from './gameloop.types'
import { GameLoopStats } from './loopstats'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

export class GameLoop implements IGameLoop {
  private _loop: AsyncGenerator<GeneratorYield, void, unknown> | null

  private _stats: IGameLoopStats
  public get stats(): IGameLoopStats {
    return this._stats
  }

  private update: UpdateFunction
  private fixedUpdate: UpdateFunction

  constructor(props: GameLoopConstructorOptions) {
    const { update = noop, fixedUpdate = noop, rate, fixedRate, duration } = props
    this._stats = new GameLoopStats({ rate, fixedRate, duration })
    this.update = update
    this.fixedUpdate = fixedUpdate
  }

  private async *generateLoop(stats: IGameLoopStats) {
    const { duration, rate } = stats

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
        ...stats,
        deltaTime,
        gameTime: updateTime - startTime
      }
    }
  }

  private clearIt() {
    const { fixedRate, rate, duration } = this._stats
    this._stats = new GameLoopStats({ fixedRate, rate, duration })
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
    this._stats = { ...this.stats, ...value }
    this.update(Object.freeze({ ...this.stats, ...value }))

    if (!done) {
      await this.runIt()
    }
  }

  public start(): void {
    if (this._loop) {
      return
    }
    this._loop = this.generateLoop(this._stats)
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
    this.clearIt()
    this.runIt()
  }
}
