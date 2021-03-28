# Changelog

<!--## Unreleased-->

## 1.1.1

- Added `prePublishOnly` script.

## 1.1.0

- Added status getters.
- Fixed stop/start issues.
- Fixed invalid `deltaTime` values for `update()` and `fixedUpdate()`.
- Fixed negative `deltaTime` value fo `render()`.

## 1.0.1

- Added support for `setImmediate` when in Node environment.
- Fixed running loop without `fixedUpdate`.
- Throwing error on missing render method.
- Docs updated.

## 1.0.0

### Features

- Added `SmartLoop` constructor.
- Added generator update loop.
- Added loop `pause()` method.
- Added `start()` / `stop()` methods.
- Added update `rate` option (default: `60`).
- Added `fixedRate` for fixed update (default: `60`).
- Added `update()` options called with `LoopUpdateProps`.
- Added `fixedUpdate()` options called with `LoopUpdateProps`.
- Added `render` based on `requestAnimationFrame` for browser evn.
- Added loop constructor options validation.

### Package

- Added distribution script.
- Added type definitions.

### Docs

- Added basic info about the package.
- Added usage example.
- Added motivation section.
- Added features section.
- Added notes.

### Example

- Simple example illustrating loop usage with typescript.
