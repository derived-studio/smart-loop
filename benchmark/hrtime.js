const NS_PER_SEC = 1e9;
const start = process.hrtime();

setTimeout(() => {
  const curr = process.hrtime();
  const diff = process.hrtime(start);

  console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
  const a = (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_SEC;
  console.log("[s]:", a);
  console.log(`0: ${start[0] * NS_PER_SEC + start[1]} nanoseconds`, start);
  console.log(`1: ${curr[0] * NS_PER_SEC + curr[1]} nanoseconds`, curr);
}, 1000);
