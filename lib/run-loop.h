#pragma once

#import <assert.h>
#import <js.h>

#import <Foundation/Foundation.h>

#import "registry.h"

static js_value_t *
bare_foundation_run_loop_main(js_env_t *env, js_callback_info_t *info) {
  int err;

  bare_foundation_registry_t *registry;
  err = js_get_callback_info(env, info, NULL, NULL, NULL, (void **) &registry);
  assert(err == 0);

  return bare_foundation_bridge(env, registry, [NSRunLoop mainRunLoop]);
}

static js_value_t *
bare_foundation_run_loop_current(js_env_t *env, js_callback_info_t *info) {
  int err;

  bare_foundation_registry_t *registry;
  err = js_get_callback_info(env, info, NULL, NULL, NULL, (void **) &registry);
  assert(err == 0);

  return bare_foundation_bridge(env, registry, [NSRunLoop currentRunLoop]);
}

static js_value_t *
bare_foundation_run_loop_current_mode(js_env_t *env, js_callback_info_t *info) {
  int err;

  size_t argc = 1;
  js_value_t *argv[1];

  bare_foundation_registry_t *registry;
  err = js_get_callback_info(env, info, &argc, argv, NULL, (void **) &registry);
  assert(err == 0);

  assert(argc == 1);

  void *handle;
  if (bare_foundation_read_tag(env, registry, argv[0], "handle", &handle) < 0) return NULL;

  js_value_t *result;

  @autoreleasepool {
    NSString *mode = ((__bridge NSRunLoop *) handle).currentMode;

    if (mode == nil) {
      err = js_get_null(env, &result);
      assert(err == 0);
    } else {
      err = js_create_string_utf8(env, (const utf8_t *) mode.UTF8String, -1, &result);
      assert(err == 0);
    }
  }

  return result;
}
