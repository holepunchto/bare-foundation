const binding = require('../binding')
const registry = require('bare-foundation-registry')

module.exports = exports = class FoundationRunLoop {
  constructor(opts = {}) {
    const { tag } = opts

    this._tag = tag

    this._token = binding.claim(this._tag, this)
  }

  get [registry.tag]() {
    return this._tag
  }

  get [registry.handle]() {
    return binding.handle(this._tag)
  }

  static get main() {
    return wrap(binding.runLoopMain())
  }

  static get current() {
    return wrap(binding.runLoopCurrent())
  }

  get currentMode() {
    return binding.runLoopCurrentMode(this._tag)
  }
}

function wrap(tag) {
  if (tag === null) return null

  return binding.wrapper(tag) ?? new exports({ tag })
}

exports.MODE = {
  DEFAULT: binding.RUN_LOOP_MODE_DEFAULT,
  COMMON: binding.RUN_LOOP_MODE_COMMON
}
