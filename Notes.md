## Methods

<!-- Shared links --->

[moz-dhres]: https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp
[moz-now]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now

<small>

| Method                             | Type                  | Format    | Precision                                 | Docs              |
| ---------------------------------- | --------------------- | --------- | ----------------------------------------- | ----------------- |
| Date.now()                         | `Number`              | ms        | 1                                         |
| `requestAnimationFrame((d)=>void)` | `DOMHighResTimeStamp` | double ms | Chrome: `1/1e3`<br/>Safari+Firefox: `1`   | [docs][moz-dhres] |
| `performance.now()`                | `DOMHighResTimeStamp` | double ms | Chrome: `1/1e12`<br />Safari+Firefox: `1` | [docs][moz-now]   |

</small>

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
