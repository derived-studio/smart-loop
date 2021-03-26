import { IGameLoopStats } from './gameloop.types'

export class GameLoopStats implements IGameLoopStats {
  created = Date.now()
  gameTime = 0
  updates = 0
  rate = 60
  fixedUpdates = 0
  fixedRate = 50
  lastUpdate = 0
  lastFixedUpdate = 0
  running = false
  paused = false
  duration = 0

  constructor(stats?: Partial<IGameLoopStats>) {
    for (const [key, value] of Object.entries(stats)) {
      this[key] = value
    }
  }
}
