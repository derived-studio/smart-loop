const start = process.hrtime.bigint();

setTimeout(() => {
  const end = process.hrtime.bigint();
  console.log(`Benchmark took ${end - start} nanoseconds`);
  const a = parseInt((end - start) / BigInt(1e6)) / 1e3;
  console.log("[s]:", a);
  console.log(`0: ${start} nanoseconds`);
  console.log(`1: ${end} nanoseconds`);
}, 1000);
