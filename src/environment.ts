// https://github.com/mozilla/pdf.js/blob/d49b2f6cc2b7ed86da22d55ddb1af0b8a5fe5a1e/src/shared/is_node.js
type UniversalProcess = NodeJS.Process & {
  // NW.js / Electron is a browser context, but copies some Node.js objects; see
  // http://docs.nwjs.io/en/latest/For%20Users/Advanced/JavaScript%20Contexts%20in%20NW.js/#access-nodejs-and-nwjs-api-in-browser-context
  // https://www.electronjs.org/docs/api/process#processversionselectron-readonly
  // https://www.electronjs.org/docs/api/process#processtype-readonly
  type: string
}

export const isNodeJS =
  typeof process === 'object' &&
  process + '' === '[object process]' &&
  !process.versions.nw &&
  !(process.versions.electron && (process as UniversalProcess).type && (process as UniversalProcess).type !== 'browser')

export const isBrowser = !isNodeJS
