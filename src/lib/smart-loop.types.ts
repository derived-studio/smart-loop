export type LoopGenerator = AsyncGenerator<LoopUpdateProps, void, unknown>
export type UpdateFunction = (stats: LoopUpdateProps) => void

export enum LoopStatus {
  Ready = 'ready',
  Running = 'running',
  Paused = 'paused',
  Stopped = 'stopped',
  Done = 'done'
}

export type LoopUpdateProps = {
  totalTime: number
  deltaTime: number
  updateTime: number
  frame: number
  fixed?: boolean
}

export type LoopOptions = {
  rate?: number
  fixedRate?: number
  duration?: number
  update?: UpdateFunction
  render?: UpdateFunction
  fixedUpdate?: UpdateFunction
}

export interface ILoop {
  pause: () => void
  resume: () => void
  start: () => void
  stop: () => void
  readonly isPaused: boolean
}
