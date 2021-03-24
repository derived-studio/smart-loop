const start = Date.now();
setTimeout(() => {
  const end = Date.now();
  console.log(`Benchmark took ${end - start}`);
  console.log("sec:", (end - start) / 1e3);
  console.log(`0: ${start}`);
  console.log(`1: ${end}`);
}, 1000);
