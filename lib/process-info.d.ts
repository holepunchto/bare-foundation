import { tag, handle, Handle } from 'bare-foundation-registry'

/** The process and the system it runs on, as an `NSProcessInfo`. */
interface FoundationProcessInfo {
  readonly [tag]: number

  readonly [handle]: Handle

  /** Seconds since the system started, not counting sleep. */
  readonly systemUptime: number
}

declare class FoundationProcessInfo {
  protected constructor()

  /** The process of the caller. */
  static readonly processInfo: FoundationProcessInfo
}

export = FoundationProcessInfo
