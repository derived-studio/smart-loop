import { getHRTime } from './time'

export function nextUpdateFrame(timeout?: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getHRTime())
    }, timeout)
  })
}

export function nextRenderFrame(): Promise<number> {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}
