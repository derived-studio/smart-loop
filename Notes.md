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

## Todo

- use https://swc.rs/ for ts compilation
