# ⚙️ intentx-core-z

[![NPM](https://img.shields.io/npm/v/intentx-core-z.svg)](https://www.npmjs.com/package/intentx-core-z) ![Downloads](https://img.shields.io/npm/dt/intentx-core-z.svg)

<a href="https://codesandbox.io/p/devbox/vjmq53" target="_blank">LIVE EXAMPLE</a>

---

**Minimal intent & reactive execution core for backend and logic runtimes**

`intentx-core-z` is a **low-level core engine** that provides:
- Intent routing & execution
- Effect orchestration (retry, debounce, takeLatest)
- Reactive computed graph
- Deterministic scheduling & batching
- Scope-aware intent isolation

It is designed as a **foundation**, not a full framework.

> No React  
> No UI lifecycle  
> No built-in store or atom  

---

## Install

```bash
npm install intentx-core-z
```

---

## Mental Model

```
emit(intent)
   ↓
intent handlers (scoped)
   ↓
effects (retry / debounce / takeLatest)
   ↓
state mutation (user-owned)
   ↓
reactive graph invalidation
   ↓
scheduled effects / computeds
```

The core owns **execution**, not **data modeling**.

---

## Basic Intent Example

```ts
import { createIntentBus } from "intentx-core-z"

type State = { count: number }

let state: State = { count: 0 }

const bus = createIntentBus<State>((payload) => ({
  state,
  payload,
  signal: new AbortController().signal,
  emit: async (type, payload) => bus.emit(type, payload),
  setState(fn) {
    fn(state)
  },
}))

bus.on("inc", ({ setState }) => {
  setState(s => {
    s.count++
  })
})

await bus.emit("inc")
console.log(state.count) // 1
```

---

## Intent Effects (takeLatest / debounce / retry)

```ts
import { intentEffect } from "intentx-core-z"

bus.effect(
  "search",
  intentEffect(async ({ payload }) => {
    console.log("searching:", payload)
  })
    .debounce(300)
    .takeLatest()
)
```

Effects wrap handlers and control async behavior.

---

## Reactive Computed Graph

```ts
import { createComputed, reactiveEffect } from "intentx-core-z"

let count = 1

const double = createComputed(() => count * 2)

reactiveEffect(() => {
  console.log("double =", double())
})

count = 2
// -> double = 4
```

- `createComputed` is lazy & dependency-tracked
- `reactiveEffect` re-runs when dependencies invalidate

---

## Scheduling & Priority

```ts
import { schedule } from "intentx-core-z"

schedule(() => {
  console.log("low priority")
}, "low")

schedule(() => {
  console.log("high priority")
}, "high")
```

Priorities:
- `high`
- `normal`
- `low` (idle / background)

---

## Batching

```ts
import { batch, queueJob } from "intentx-core-z"

batch(() => {
  queueJob(() => console.log("A"), "normal")
  queueJob(() => console.log("B"), "high")
})
```

Batching defers execution and preserves highest priority.

---

## Scopes

```ts
import { createScope } from "intentx-core-z"

const admin = createScope("admin")

bus.on("reset", () => {
  state.count = 0
}, admin)

await bus.emit("reset", null, admin)
```

Scopes isolate intent handlers and effects.

---

## Devtools Graph

```ts
import { trackNode, linkNodes } from "intentx-core-z"

const a = trackNode("atom", "count")
const b = trackNode("computed", "double")

linkNodes(a, b)
```

Used internally for dependency visualization and debugging.

---

## What This Library Is For

- Backend intent execution
- Domain logic orchestration
- Custom state engines
- Reactive runtimes
- Framework adapters

## What This Library Is NOT

- ❌ React state library
- ❌ UI framework
- ❌ Opinionated data model
- ❌ Full application framework

---

## Architecture Recommendation

```
intentx-core-z        ← execution & orchestration
        ↑
state primitives      ← atom / entity / domain state
        ↑
framework adapters    ← React / Vue / Worker / CLI
```

---

## Philosophy

- Intent is the only entry point
- Execution must be deterministic
- Effects orchestrate, handlers mutate
- Reactive graph stays explicit
- Core stays small

---

## License

MIT
