import { IGameLoopStats } from '../gameloop.types'
import { GameLoop } from '../gameloop'

const ignore = false
let t = 0
const update = (stats: IGameLoopStats) => {
  if (ignore) return
  console.log('ut', ++t, stats)
}

const gameLoop = new GameLoop({ duration: 4000, rate: 5, update })
gameLoop.start()

setTimeout(() => gameLoop.pause(), 2000)
setTimeout(() => gameLoop.resume(), 3000)

console.log('starting....')
