import { getHRTime } from './time'

export function nextUpdateFrame(timeout?: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getHRTime())
    }, timeout)
  })
}

export function nextDrawFrame(): Promise<number> {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}
