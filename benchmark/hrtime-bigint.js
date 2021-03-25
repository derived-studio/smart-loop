const start = process.hrtime.bigint()

setTimeout(() => {
  const end = process.hrtime.bigint()
  console.log(`Benchmark took ${end - start} nanoseconds`)
  console.log('[s]:', parseInt(end - start) / 1e9)
  console.log(`0: ${start} nanoseconds`)
  console.log(`1: ${end} nanoseconds`)
}, 1000)
