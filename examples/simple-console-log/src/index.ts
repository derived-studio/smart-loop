import { SmartLoop, LoopUpdateProps } from '@derived/smart-loop'

const render = (stats: LoopUpdateProps) => console.log(`[RENDER] - ${JSON.stringify(stats)}`)
const update = (stats: LoopUpdateProps) => console.log(`[UPDATE] - ${JSON.stringify(stats)}`)
const fixedUpdate = (stats: LoopUpdateProps) => console.log(`[FIXED] - ${JSON.stringify(stats)}`)

const loop = new SmartLoop({
  duration: 4000,
  rate: 10,
  fixedRate: 10,
  fixedUpdate,
  update,
  render: render
})

loop.start()

setTimeout(() => loop.pause(), 2000)
setTimeout(() => loop.resume(), 3000)
