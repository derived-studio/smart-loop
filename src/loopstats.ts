import { GameLoopStats } from './gameloop.types'

export function createLoopStats(partialStats: Partial<GameLoopStats>, opts: { freeze: true }): GameLoopStats {
  const { freeze: lock = false } = opts
  const stats = {
    created: Date.now(),
    gameTime: 0,
    updates: 0,
    rate: 0,
    fixedUpdates: 0,
    fixedRate: 0,
    lastUpdate: 0,
    lastFixedUpdate: 0,
    running: false,
    paused: false,
    ...partialStats
  }

  return lock ? stats : Object.freeze(stats)
}
