## Methods

<small>

| Method                             | Type                  | Format    | Precision                                 | Docs              |
| ---------------------------------- | --------------------- | --------- | ----------------------------------------- | ----------------- |
| Date.now()                         | `Number`              | ms        | 1                                         |
| `requestAnimationFrame((d)=>void)` | `DOMHighResTimeStamp` | double ms | Chrome: `1/1e3`<br/>Safari+Firefox: `1`   | [docs][moz-dhres] |
| `performance.now()`                | `DOMHighResTimeStamp` | double ms | Chrome: `1/1e12`<br />Safari+Firefox: `1` | [docs][moz-now]   |

</small>

## References

### Good reads

- [Game timers: Issues and solutions.](https://www.fabiensanglard.net/timer_and_framerate/index.php)
- [Fix Your Timestep!](https://gafferongames.com/post/fix_your_timestep/)
- [Game loop](http://gameprogrammingpatterns.com/game-loop.html) from [Game Programming Patterns books](http://gameprogrammingpatterns.com/)
- [A Modern C++ Game Loop Template (MIT)](https://www.reddit.com/r/gamedev/comments/41v2td/a_modern_c_game_loop_template_mit/) on Reddit

<!-- Shared links --->

[moz-dhres]: https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp
[moz-now]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now

### Libraries

- [node-microtime](https://github.com/wadey/node-microtime) (benchmark [gist](https://gist.github.com/fengmk2/4345606))
