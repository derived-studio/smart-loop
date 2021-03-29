# SmartLoop

Zero-dependency utility for running JS up to 3 parallel update methods at configurable rate.

## Motivation

Needed zero-dependency isomorphic game loop allowing running render and simulation updates at different configurable rate and support for deterministic lockstep networking.

## Features

- Written in TypeScript (includes definitions)
- Created using ES6 generators
- Can be run in both browser or Node
- [Electron](https://www.electronjs.org/) and [NWJS](https://nwjs.io/) friendly
- Supports up to 3 separate update method types `render()`, `update()`, `fixedUpdate()`
  - Maximum 2 update methods when in Node `render()`
- Exposes `render()` method build on the top of `requestAnimationFrame()`
- Uses `setImmediate()` and `setTimeout()` when in Node

## Usage

```
const update = () => { /* render code */ }
const fixedUpdate = () => { /* physics code */ }

const loop = new SmartLoop({ rate: 60, update, fixedRate: 30, fixedUpdate  })

loop.start()

setTimeout(() => loop.pause(), 2000)
setTimeout(() => loop.resume(), 3000)
```

## References

### Good reads

- [High Resolution Time](https://www.w3.org/TR/hr-time) from [w3.org](https://www.w3.org)
- [Game timers: Issues and solutions.](https://www.fabiensanglard.net/timer_and_framerate/index.php)
- [Fix Your Timestep!](https://gafferongames.com/post/fix_your_timestep/) by Glenn Fiedler
- [Game loop](http://gameprogrammingpatterns.com/game-loop.html) from [Game Programming Patterns books](http://gameprogrammingpatterns.com/)
- [A Modern C++ Game Loop Template (MIT)](https://www.reddit.com/r/gamedev/comments/41v2td/a_modern_c_game_loop_template_mit/) on Reddit

### GDC Talks

- [GDC - Networking for Physics](https://www.youtube.com/watch?v=Z9X4lysFr64) by Glenn Fiedler
- [8 Frames in 16ms: Rollback Networking in Mortal Kombat and Injustice 2](https://www.youtube.com/watch?v=7jb0FOcImdg&t=1082s&ab_channel=GDC) by Michael Stallone

### Libraries

- [node-microtime](https://github.com/wadey/node-microtime) (benchmark [gist](https://gist.github.com/fengmk2/4345606))
