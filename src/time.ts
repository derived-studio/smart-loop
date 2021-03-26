import { isBrowser, isNodeJS } from './environment'

export function getHRTime() {
  try {
    if (isBrowser) {
      return performance.now()
    }
    if (isNodeJS) {
      return process.hrtime()
    }
  } finally {
    return Date.now()
  }
}
