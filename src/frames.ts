import { getHRTime } from './time'

export function nextUpdateFrame(timeout?: number): Promise<[number, number]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([getHRTime(), 1])
    }, timeout)
  })
}

export function nextDrawFrame(): Promise<[number, number]> {
  return new Promise((resolve) => {
    requestAnimationFrame((t) => resolve([t, 0]))
  })
}

export async function nextFastestFrame(timeout?: number): Promise<[number, number]> {
  return await Promise.race([nextUpdateFrame(timeout), nextDrawFrame()])
}
