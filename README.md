# bare-foundation

Foundation bindings for Bare.

The module wraps Foundation objects in JavaScript classes. Each wrapper is registered with `bare-foundation-registry`, so you can pass it to any other addon that uses the registry.

```
npm i bare-foundation
```

## Usage

### Getting a run loop

`RunLoop` wraps an `NSRunLoop`. You cannot create one yourself. Instead, ask for the loop of the main thread or the loop of the thread you are on:

```js
const { RunLoop } = require('bare-foundation')

const main = RunLoop.main
const current = RunLoop.current
```

### Checking the mode of a run loop

A run loop runs in one mode at a time. `currentMode` tells you which one, or `null` if the loop is not running:

```js
if (RunLoop.main.currentMode === RunLoop.MODE.DEFAULT) {
  // The main loop is running in the default mode
}
```

The modes are in `RunLoop.MODE`:

- `DEFAULT` is the mode a loop usually runs in.
- `COMMON` stands for all modes marked as common, which is where most sources are added.

### Passing a run loop to another addon

A run loop is a Foundation object like any other, so another addon can take it through `bare-foundation-registry`:

```js
const binding = require('./binding')
const registry = require('bare-foundation-registry')
const { RunLoop } = require('bare-foundation')

binding.scheduleIn(registry.adopt(binding, RunLoop.main))
```

## License

Apache-2.0
