const binding = require('../binding')
const registry = require('bare-foundation-registry')

module.exports = exports = class FoundationProcessInfo {
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

  static get processInfo() {
    return wrap(binding.processInfoProcessInfo())
  }

  get systemUptime() {
    return binding.processInfoSystemUptime(this._tag)
  }
}

function wrap(tag) {
  if (tag === null) return null

  return binding.wrapper(tag) ?? new exports({ tag })
}
