const start = performance.now()
const MS_PER_S = 1e3
let elapsed = 0
let updates = 0

function update(t) {
  updates++
  elapsed = t - start
  if (elapsed < MS_PER_S) {
    window.requestAnimationFrame(update)
    return
  }

  console.log(`Benchmark took ${elapsed} ms.`)
  console.log(`Completed in ${updates} at average ${elapsed / updates}ms per frame.`)
  console.log('sec:', (t - start) / MS_PER_S)
  console.log(`0: ${start}`)
  console.log(`1: ${t}`)
}

window.requestAnimationFrame(update)
