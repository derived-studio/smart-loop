import { isBrowser } from '../environment'
import { GameLoop } from '../gameloop'
import { LoopUpdateProps } from '../gameloop.types'

const render = (stats: LoopUpdateProps) => console.log(`[RENDER] - ${JSON.stringify(stats)}`)
const update = (stats: LoopUpdateProps) => console.log(`[UPDATE] - ${JSON.stringify(stats)}`)

const gameLoop = new GameLoop({ duration: 4000, rate: 30, update, render: isBrowser ? render : null })

gameLoop.start()

setTimeout(() => gameLoop.pause(), 2000)
setTimeout(() => gameLoop.resume(), 3000)
