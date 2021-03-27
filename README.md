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

## References

### Good reads

- [High Resolution Time](https://www.w3.org/TR/hr-time) from [w3.org](https://www.w3.org)
- [Game timers: Issues and solutions.](https://www.fabiensanglard.net/timer_and_framerate/index.php)
- [Fix Your Timestep!](https://gafferongames.com/post/fix_your_timestep/)
- [Game loop](http://gameprogrammingpatterns.com/game-loop.html) from [Game Programming Patterns books](http://gameprogrammingpatterns.com/)
- [A Modern C++ Game Loop Template (MIT)](https://www.reddit.com/r/gamedev/comments/41v2td/a_modern_c_game_loop_template_mit/) on Reddit

### GDC Talks

- [GDC - Networking for Physics](https://www.youtube.com/watch?v=Z9X4lysFr64) by Glenn Fiedler
- [8 Frames in 16ms: Rollback Networking in Mortal Kombat and Injustice 2](https://www.youtube.com/watch?v=7jb0FOcImdg&t=1082s&ab_channel=GDC) by Michael Stallone

### Libraries

- [node-microtime](https://github.com/wadey/node-microtime) (benchmark [gist](https://gist.github.com/fengmk2/4345606))
