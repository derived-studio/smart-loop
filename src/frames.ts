export function nextUpdateFrame(timeout?: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(this.getHRTime())
    }, timeout)
  })
}

export function nextDrawFrame(): Promise<number> {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}
