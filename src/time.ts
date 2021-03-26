import { isBrowser, isNodeJS } from './environment'

export function getHRTime(): number {
  try {
    if (isBrowser) {
      return performance.now()
    }
    if (isNodeJS) {
      const time = process.hrtime()
      return time[0] * 1e9 + time[1]
    }
  } catch {
    return Date.now()
  }
}
