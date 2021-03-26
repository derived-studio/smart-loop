export type LoopGeneratorProps = {
  duration?: number
  rate: number
}

export type LoopUpdateProps = {
  gameTime: number
  deltaTime: number
  frame: number
}

export type UpdateFunction = (stats: LoopUpdateProps) => void

export type GameLoopProps = {
  rate?: number
  fixedRate?: number
  duration?: number
  update?: UpdateFunction
  fixedUpdate?: UpdateFunction
}

export interface IGameLoopStats {
  deltaTime: number
  gameTime: number
  frame: number
  // done: boolean
  // paused: boolean

  /*
  expires: number
  rate: number
  created: number
  fixedUpdates: number
  fixedRate: number
  lastUpdate: number
  lastFixedUpdate: number
  */
}

export interface IGameLoop {
  pause: () => void
  resume: () => void
  start: () => void
  stop: () => void
  readonly isPaused: boolean
}
