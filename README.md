# ⚙️ intentx-core-z

[![NPM](https://img.shields.io/npm/v/intentx-core-z.svg)](https://www.npmjs.com/package/intentx-core-z)
![Downloads](https://img.shields.io/npm/dt/intentx-core-z.svg)

<a href="https://codesandbox.io/p/devbox/vjmq53" target="_blank">LIVE EXAMPLE</a>

**Minimal intent engine for backend & logic runtimes**

------------------------------------------------------------------------

## Why

`intentx-core-z` is a **small, framework-agnostic intent engine** that
focuses on:

-   Intent routing
-   Effect orchestration
-   Deterministic async execution
-   Backend-safe runtime

No React. No store. No UI lifecycle.

------------------------------------------------------------------------

## Install

``` bash
npm install intentx-core-z
```

------------------------------------------------------------------------

## Basic Usage

``` ts
import { createBackendRuntime } from "intentx-core-z"

type State = { count: number }

const rt = createBackendRuntime<State>({ count: 0 })

rt.onIntent("inc", ({ setState }) => {
  setState(s => { s.count++ })
})

await rt.emit("inc")
console.log(rt.state().count) // 1
```

------------------------------------------------------------------------

## Core Concepts

-   **Intent**: semantic event
-   **Effect**: async orchestration (retry, debounce, takeLatest)
-   **Runtime**: owns state & execution

------------------------------------------------------------------------

## Backend Runtime API

-   `emit(intent, payload?)`
-   `onIntent(intent, handler)`
-   `effect(intent, fx)`
-   `state()`
-   `snapshot()`
-   `setState(fn)`
-   `replaceState(next)`
-   `reset()`
-   `batch(fn)`

------------------------------------------------------------------------

## Philosophy

-   Intent is the only entry
-   Effects orchestrate, handlers mutate
-   Runtime owns state
-   Core stays small

------------------------------------------------------------------------

MIT License
