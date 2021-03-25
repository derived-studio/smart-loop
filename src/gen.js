function nextStep() {
  return new Promise((resolve) => {
    console.log('- wait frame')
    requestAnimationFrame(resolve)
    // setTimeout(resolve)
  })
}

const ms2s = 1e3
async function* generateLoop(props) {
  const { gameTime, rate } = props
  const frameTime = 1000 / rate
  const startTime = await nextStep()
  let updateTime = startTime

  while (updateTime - startTime < gameTime) {
    let deltaTime = 0
    console.log(updateTime - startTime, '<', gameTime, updateTime - startTime < gameTime)
    // console.log('============================')
    // console.log('>> startTime', startTime)
    // console.log('>> loopTime', loopTime)
    // console.log('>> deltaTime', deltaTime)

    while (deltaTime < frameTime) {
      const stepTime = await nextStep()
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

  ;(async () => {
    let loop = generateLoop({ gameTime, rate })

    const runIt = async () => {
      const { done, value } = await loop.next()
      update(value)
      if (!done) {
        await runIt()
      }
    }

    await runIt()
    // while (loop) {
    //   // const p = await loop.next()
    //   update(await loop.next())
    // }
  })()
}

let t = 0
const update = (d) => console.log('ut', ++t, d)
createGameLoop({ gameTime: 1000, rate: 10, update })
