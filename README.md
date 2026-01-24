# 🧬 intentx-core-z

[![NPM](https://img.shields.io/npm/v/intentx-core-z.svg)](https://www.npmjs.com/package/intentx-core-z) ![Downloads](https://img.shields.io/npm/dt/intentx-core-z.svg)

[LIVE EXAMPLE](https://codesandbox.io/p/devbox/vjmq53)

**Minimal intent-driven & reactive execution core for logic runtimes.**

---

## Overview

`intentx-core-z` is a **low-level execution engine** focused on *how logic runs*, not how UI renders or how state is stored.

It is designed to be used as a **logic core** that can run:
- Outside React
- On backend / workers / CLI
- Without framework coupling
- With full control over state and effects

> This library is about **execution**, not data modeling.

---

## Features

- Intent-based execution model
- Async effect orchestration
  - debounce
  - throttle
  - takeLatest / takeLeading
- Explicit reactive computation
- Deterministic scheduling & batching
- Scope-based isolation
- Framework-agnostic design

No reducers.  
No proxies.  
No hidden magic.

---

## Use Cases

- Backend command / intent handling
- Domain & business rule engines
- Workflow / automation runtimes
- Logic cores for React / Vue / Workers
- Fully testable logic (no UI dependency)

---

## Mental Model

```
emit(intent)
   ↓
scoped handlers
   ↓
effect orchestration
   ↓
user-owned state mutation
   ↓
reactive invalidation
   ↓
scheduled recomputation
```

---

## Installation

```bash
npm install intentx-core-z
```

---

## Intent Execution

```ts
import { createIntentBus } from "intentx-core-z"

type State = { count: number }
let state: State = { count: 0 }

const bus = createIntentBus<State>((payload, scope) => ({
  state,
  payload,
  emit: (type, payload) => bus.emit(type, payload, scope),
  setState(fn) {
    fn(state)
  },
}))

bus.on("increment", ({ setState }) => {
  setState(s => {
    s.count++
  })
})

await bus.emit("increment")
console.log(state.count) // 1
```

---

## Async Effects & Orchestration

```ts
import { intentEffect } from "intentx-core-z"

bus.effect(
  "search",
  intentEffect(async ({ payload }) => {
    console.log("Searching:", payload)
  })
    .debounce(300)
    .throttle(1000)
    .takeLatest()
)
```

---

## Reactive Computation

```ts
import { createComputed, reactiveEffect } from "intentx-core-z"

let count = 1

const double = createComputed(() => count * 2)

reactiveEffect(() => {
  console.log("double =", double())
})

count = 2
```

---

## Scheduling & Batching

```ts
import { batch, queueJob } from "intentx-core-z"

batch(() => {
  queueJob(() => console.log("low priority"), "low")
  queueJob(() => console.log("high priority"), "high")
})
```

---

## Scopes

```ts
import { createScope } from "intentx-core-z"

const admin = createScope("admin")

bus.on("reset", ({ setState }) => {
  setState(s => {
    s.count = 0
  })
}, admin)

await bus.emit("reset", null, admin)
```

---

## eventbus-z Integration

```ts
import EventBus from "eventbus-z"
import { createIntentBus } from "intentx-core-z"

const bus = createIntentBus(ctx => ({
  ...ctx,
  emit: (type, payload) => EventBus.$emit(type, payload),
}))

EventBus.$on("INCREMENT", payload => {
  bus.emit("increment", payload)
})
```

---

## License

MIT
