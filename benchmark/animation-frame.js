const start = performance.now();
const ms2s = 1e3;
let elapsed = 0;

function update(t) {
  elapsed = t - start;
  if (elapsed < ms2s) {
    window.requestAnimationFrame(update);
    return;
  }

  console.log("sec:", (t - start) / ms2s);
  console.log(`0: ${start}`);
  console.log(`1: ${t}`);
}

window.requestAnimationFrame(update);
