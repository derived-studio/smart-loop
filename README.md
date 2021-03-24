# GameLoop

GameLoop is a universal game loop for games written in modern JavaScript.

## Features

- Works in both browser and node environments
- Uses `window.requestAnimationFrame()` when run in a browser
- Uses `setImmediate()` and `setInterval` when run in Node

## Usage

```
const update = () => { /* game update code */ }
const gameLoop = new GameLoop(update)
game
```
