#import <assert.h>
#import <bare.h>
#import <js.h>

#import "lib/run-loop.h"

static js_value_t *
bare_foundation_exports(js_env_t *env, js_value_t *exports) {
  int err;

  bare_foundation_registry_t *registry = bare_foundation_registry_create(env, exports);

#define V(name, fn) \
  { \
    js_value_t *val; \
    err = js_create_function(env, name, -1, fn, registry, &val); \
    assert(err == 0); \
    err = js_set_named_property(env, exports, name, val); \
    assert(err == 0); \
  }

  V("claim", bare_foundation_claim)
  V("wrapper", bare_foundation_wrapper)
  V("registrySize", bare_foundation_registry_size)
  V("handle", bare_foundation_handle)
  V("adopt", bare_foundation_adopt)

  V("runLoopMain", bare_foundation_run_loop_main)
  V("runLoopCurrent", bare_foundation_run_loop_current)
  V("runLoopCurrentMode", bare_foundation_run_loop_current_mode)
#undef V

#define S(name, string) \
  { \
    js_value_t *val; \
    err = js_create_string_utf8(env, (const utf8_t *) (string).UTF8String, -1, &val); \
    assert(err == 0); \
    err = js_set_named_property(env, exports, name, val); \
    assert(err == 0); \
  }

  S("RUN_LOOP_MODE_DEFAULT", NSDefaultRunLoopMode)
  S("RUN_LOOP_MODE_COMMON", NSRunLoopCommonModes)
#undef S

  return exports;
}

BARE_MODULE(bare_foundation, bare_foundation_exports)
