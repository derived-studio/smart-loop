# GameLoop

GameLoop is a universal game loop for games written for modern JavaScript.

## Features

- Written in TypeScript (comes with definitions)
- Created using ES6 generators
- Works in both browser and node environments
- Uses `window.requestAnimationFrame()` when run in a browser
- Uses `setImmediate()` and `setInterval` when run in Node

## Usage

```
const update = () => { /* render code */ }
const fixedUpdate = () => { /* physics code */ }

const gameLoop = createGameLoop({ rate: 60, update, fixedRate: 30, fixedUpdate  })

gameLoop.start()


setTimeout(() => gameLoop.pause(), 2000)
setTimeout(() => gameLoop.resume(), 3000)





```

## Todo

- use https://swc.rs/ for ts compilation
