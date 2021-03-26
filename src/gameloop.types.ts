export type GameLoopGeneratorProps = {
  duration?: number
  rate: number
}

export type UpdateFunction = (stats: Readonly<IGameLoopStats>) => void

export type GameLoopConstructorOptions = {
  update?: UpdateFunction
  fixedUpdate?: UpdateFunction
  rate?: number
  fixedRate?: number
  duration?: number
}

export type GeneratorYield = {
  gameTime: number
  deltaTime: number
}

export interface IGameLoopStats {
  created: number
  gameTime: number
  updates: number
  rate: number
  fixedUpdates: number
  fixedRate: number
  lastUpdate: number
  lastFixedUpdate: number
  running: boolean
  paused: boolean
  duration?: number
}

export interface IGameLoop {
  pause: () => void
  resume: () => void
  restart: () => void
  start: () => void
  stop: () => void
  readonly stats: IGameLoopStats
}
