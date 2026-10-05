cmake_minimum_required(VERSION 4.0)

find_package(cmake-bare REQUIRED PATHS node_modules/cmake-bare)

project(bare_foundation C OBJC)

add_bare_module(bare_foundation)

target_sources(
  ${bare_foundation}
  PRIVATE
    binding.m
)

target_include_directories(
  ${bare_foundation}
  PRIVATE
    node_modules/bare-foundation-registry/lib
)

target_link_libraries(
  ${bare_foundation}
  PUBLIC
    "-framework Foundation"
)
