#pragma once

#import <assert.h>
#import <js.h>

#import <Foundation/Foundation.h>

#import "registry.h"

static js_value_t *
bare_foundation_process_info_process_info(js_env_t *env, js_callback_info_t *info) {
  int err;

  bare_foundation_registry_t *registry;
  err = js_get_callback_info(env, info, NULL, NULL, NULL, (void **) &registry);
  assert(err == 0);

  return bare_foundation_bridge(env, registry, [NSProcessInfo processInfo]);
}

static js_value_t *
bare_foundation_process_info_system_uptime(js_env_t *env, js_callback_info_t *info) {
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
  err = js_create_double(env, ((__bridge NSProcessInfo *) handle).systemUptime, &result);
  assert(err == 0);

  return result;
}
