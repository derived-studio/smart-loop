function delay():Promise<number> {
  return new Promise((resolve) => {
    console.log('- wait frame')
    requestAnimationFrame(resolve)
  })
}

const ms2s = 1e3
export type GameLoopGeneratorProps = {
  gameTime: number,
  rate: number
}

export type UpdateProps = {
  deltaTime: number
  gameTime: number
}
// export type GameLoopGenerator = AsyncGenerator<number, number, unknown>

async function* generateGameLoop(props: GameLoopGeneratorProps) {  
  const { gameTime, rate } = props
  const frameTime = 1000 / rate
  console.log('>1')
  const startTime = await delay()
  let updateTime = startTime
  console.log('>2')

  while (updateTime - startTime < gameTime) {
    let deltaTime = 0
    console.log(updateTime - startTime, '<', gameTime, updateTime - startTime < gameTime)
    // console.log('============================')
    // console.log('>> startTime', startTime)
    // console.log('>> loopTime', loopTime)
    // console.log('>> deltaTime', deltaTime)

    while (deltaTime < frameTime) {
      const stepTime = await delay()
      const stepDelta = stepTime - updateTime
      deltaTime += stepDelta
      updateTime += stepDelta

      // console.log('--------------------------')
      // console.log('>> deltaTime', deltaTime)
      // console.log('>> stepDelta', stepDelta)
      // console.log('>> stepTime', stepTime)
      // console.log('>> loopTime', loopTime)
    }
    yield { deltaTime, gameTime: updateTime - startTime } as UpdateProps
  }  
}


export interface IGameLoop { 
  pause: () => void
  resume: () => void
  restart: () => void
  start: () => void
  stop: () => void
}


function createGameLoop(props: {
  update: (props: UpdateProps) => void,
  gameTime: number,
  rate: number
}):IGameLoop {
  console.log('>000')
  const { update, gameTime, rate } = props
  let running = false
  let loop: AsyncGenerator<UpdateProps, void, unknown> | null
  console.log('>0001')

  const start = async () => {
    console.log('>0002 sss')
    loop = generateGameLoop({ gameTime, rate })
    
    await runIt()
  }

  const runIt = async () => {
    console.log('>0003 sss', loop === null, loop === undefined)
    if (loop === null) {

      console.log('>0003 sss xxxx', loop)
      return
    }

    console.log('>0004 sss')
    running = true
    const { done, value } = await loop.next()
    if (!loop || !running) {
      return
    }

    update(value as UpdateProps)

    if (!done) {
      await runIt()
    }
  }

  const pause = () => {
    running = false
  }

  const resume = () => {
    if (loop && !running) {
      runIt()
    }
  }

  const stop = () => {
    loop = null
  }

  const restart = () => {
    stop()
    start()
  }

  return {
    start,
    stop,
    pause,
    resume,
    restart
  }
}

let t = 0
const update = (d: UpdateProps) => console.log('ut', ++t, d)
const gameLoop = createGameLoop({ gameTime: 5000, rate: 10, update })
gameLoop.start()

setTimeout(() => gameLoop.pause(), 2000)
setTimeout(() => gameLoop.resume(), 3000)

console.log('starting....')
