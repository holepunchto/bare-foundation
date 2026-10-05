import { tag, handle, Handle } from 'bare-foundation-registry'

/** A loop that runs the work of a thread, as an `NSRunLoop`. */
interface FoundationRunLoop {
  readonly [tag]: number

  readonly [handle]: Handle

  /** The `MODE` the loop is running in, or `null` while it is not running. */
  readonly currentMode: string | null
}

declare class FoundationRunLoop {
  protected constructor()

  /** The loop of the main thread. */
  static readonly main: FoundationRunLoop

  /** The loop of the calling thread. */
  static readonly current: FoundationRunLoop

  /** The modes a loop runs in, as `NSRunLoopMode` values. */
  static readonly MODE: {
    readonly DEFAULT: string
    /** The modes marked as common, which is where most sources are added. */
    readonly COMMON: string
  }
}

export = FoundationRunLoop
