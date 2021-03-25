function delay(time) {
  return new Promise((resolve) => {
    console.log('- wait frame')
    requestAnimationFrame(resolve)
  }, time)
}

const ms2s = 1e3
async function* generateGameLoop(props) {
  const { gameTime, rate } = props
  const frameTime = 1000 / rate
  const startTime = await delay()
  let updateTime = startTime

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
    yield { deltaTime, gameTime: updateTime - startTime }
  }
}

function createGameLoop(props) {
  const { update, gameTime, rate } = props
  let running = false
  let loop = null

  const start = async () => {
    loop = generateGameLoop({ gameTime, rate })
    await runIt()
  }

  const runIt = async () => {
    running = true
    const { done, value } = await loop.next()
    if (!loop || !running) {
      return
    }

    update(value)
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
const update = (d) => console.log('ut', ++t, d)
const gameLoop = createGameLoop({ gameTime: 5000, rate: 10, update })
gameLoop.start()

setTimeout(() => gameLoop.pause(), 2000)
setTimeout(() => gameLoop.resume(), 3000)
