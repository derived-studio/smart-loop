import { GameLoopStats } from '../gameloop.types'
import { GameLoop } from '../gameloop'

let t = 0
const update = (stats: GameLoopStats) => {
  console.log('ut', ++t, stats)
}

const gameLoop = new GameLoop({ duration: 4000, rate: 10, update })
gameLoop.start()

setTimeout(() => gameLoop.pause(), 2000)
setTimeout(() => gameLoop.resume(), 3000)

console.log('starting....')
