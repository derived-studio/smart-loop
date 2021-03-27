import { GameLoop } from '../gameloop'
import { LoopUpdateProps } from '../gameloop.types'

const update = (stats: LoopUpdateProps) => console.log('🕰️', stats)
const render = (stats: LoopUpdateProps) => console.log('🖌️', stats)

const gameLoop = new GameLoop({ duration: 4000, rate: 30, update, render })

gameLoop.start()

setTimeout(() => gameLoop.pause(), 2000)
setTimeout(() => gameLoop.resume(), 3000)
