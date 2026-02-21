# 🧬 intentx-core-z

[![NPM](https://img.shields.io/npm/v/intentx-core-z.svg)](https://www.npmjs.com/package/intentx-core-z) ![Downloads](https://img.shields.io/npm/dt/intentx-core-z.svg)

[LIVE EXAMPLE](https://codesandbox.io/p/devbox/vjmq53)

A **minimal, framework-agnostic** intent-driven execution core.

> `intentx-core-z` is a low-level runtime for orchestrating logic deterministically.

---

## Why intentx-core-z

- ✅ Deterministic execution
- ✅ Async control (debounce / throttle / takeLatest / takeLeading)
- ✅ Fine-grained signals
- ✅ Lazy computed values
- ✅ Priority scheduler
- ✅ Batching
- ✅ Scope isolation
- ✅ Framework-agnostic
- ✅ Zero external dependencies

---

## Mental Model

```text
emit(intent)
   ↓
scoped handlers
   ↓
effect orchestration (debounce / takeLatest / ...)
   ↓
explicit state mutation
   ↓
reactive invalidation
   ↓
scheduled recomputation
   ↓
scheduler flush (priority ordered)
```

Execution is explicit.  
State mutation is explicit.  
Reactivity is explicit.

---

## Installation

```bash
npm install intentx-core-z
```

---

## Import

```ts
import {
  createIntentBus,
  intentEffect,
  signal,
  createComputed,
  reactiveEffect,
  batch,
  queueJob,
  createScope
} from "intentx-core-z"
```

---

# Intent Runtime

## 1️⃣ Basic Intent Execution

```ts
import { createIntentBus } from "intentx-core-z"

type State = { count: number }

const state: State = { count: 0 }

const bus = createIntentBus<State>((payload, scope) => ({
  state,
  payload,
  scope,
  emit: (type, payload) => bus.emit(type, payload, scope),
  setState(fn) {
    fn(state)
  }
}))

bus.on("increment", ({ setState }) => {
  setState(s => {
    s.count++
  })
})

await bus.emit("increment")

console.log(state.count) // 1
```

State is user-owned.  
IntentBus controls execution only.

---

## 2️⃣ Async Effect Orchestration

```ts
import { intentEffect } from "intentx-core-z"

bus.effect(
  "search",
  intentEffect()
    .debounce(300)
    .takeLatest()
)
```

Available controls:

- `.debounce(ms)`
- `.throttle(ms)`
- `.takeLatest()`
- `.takeLeading()`

Effects wrap handlers — no hidden scheduler.

Execution remains deterministic.

---

# Reactive Core

Reactive primitives are independent from IntentBus.

---

## 3️⃣ signal

```ts
import { signal } from "intentx-core-z"

const count = signal(1)

count.set(2)
console.log(count()) // 2
```

- Fine-grained
- Pull-based
- No proxies

---

## 4️⃣ computed

```ts
import { signal, createComputed } from "intentx-core-z"

const count = signal(1)

const double = createComputed(() => {
  return count() * 2
}) // computed

console.log(double()) // 2

count.set(3)

console.log(double()) // 6
```

- Lazy
- Cached
- Dependency tracked automatically

---

## 5️⃣ reactiveEffect

```ts
import {
  signal,
  createComputed,
  reactiveEffect
} from "intentx-core-z"

const count = signal(1)

const double = createComputed(() => count() * 2)

const triple = createComputed(() => double() + count())

reactiveEffect(() => {
  console.log("double =", double())
})

count.set(2)
// → double = 4
```

Effects rerun only when dependencies change.

---

# Scheduler & Batching

## 6️⃣ batch

```ts
import { batch, signal, reactiveEffect } from "intentx-core-z"

const count = signal(0)

reactiveEffect(() => {
  console.log("count =", count())
})

batch(() => {
  count.set(1)
  count.set(2)
  count.set(3)
})

// effect runs once → count = 3
```

```ts
const handleClick = () => {
    batch(() => {
      count.set(1)
      count.set(2)
      count.set(3)
    })
  }
<button onClick={handleClick}>Batch</button>
```

---

## 7️⃣ queueJob with priority

```ts
import { queueJob } from "intentx-core-z"

queueJob(() => console.log("low"), "low")
queueJob(() => console.log("high"), "high")
```

Priority levels:

- `"high"`
- `"normal"`
- `"low"`

Jobs are deduplicated per flush cycle.

---

# Scope Isolation

Scopes isolate intent handlers.

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

Scopes are symbol-based.  
No cross-scope leakage.

---

# Optional: eventbus-z

`intentx-core-z` does not depend on any event bus.

If you want UI-level signaling:

```ts
import EventBus from "eventbus-z"
import { createIntentBus } from "intentx-core-z"

const bus = createIntentBus(context => context)

// bridge UI → intent
EventBus.$on("INCREMENT", payload => {
  bus.emit("increment", payload)
})
```

Architecture layering:

```
UI → eventbus-z → intentx-core-z → reactive
```

- EventBus = transport
- IntentBus = orchestration
- Reactive = invalidation

Each layer remains independent.

---

# API Overview

## IntentBus

| Method                             | Description                  |
| ---------------------------------- | ---------------------------- |
| `createIntentBus(getContext)`      | Create scoped intent runtime |
| `bus.on(type, handler, scope?)`    | Register intent handler      |
| `bus.effect(type, effect, scope?)` | Attach effect middleware     |
| `bus.emit(type, payload?, scope?)` | Emit intent                  |
| `createScope(label?)`              | Create isolated scope        |

## Reactive

| Primitive            | Description              |
| -------------------- | ------------------------ |
| `signal(initial)`    | Reactive state primitive |
| `createComputed(fn)` | Lazy derived value       |
| `reactiveEffect(fn)` | Reactive side-effect     |
| `batch(fn)`          | Batch multiple updates   |


---

# Who Should Use This

- Backend command engines
- Domain-driven execution layers
- Automation workflows
- Micro-frontend orchestration
- UI-independent business logic
- Worker-based logic runtime
- Highly testable logic systems

---

# Design Principles

- Deterministic execution
- Explicit state mutation
- No hidden global state
- No magic subscriptions
- Runtime-controlled scheduling
- Separation of transport / orchestration / state

---

# Positioning

intentx-core-z is positioned as an execution kernel — not a store and not a stream library.   
The comparison below reflects execution model differences, not feature completeness.   

| Criteria                    | intentx-core-z     | Store-based (Redux / Zustand) | Stream-based (RxJS) |
| --------------------------- | ------------------ | ----------------------------- | ------------------- |
| Intent-based execution      | ✅                  | ❌                             | ⚠️                  |
| Deterministic orchestration | ✅                  | ⚠️                            | ❌                   |
| Built-in async control      | ✅                  | ❌                             | ✅                   |
| Fine-grained reactivity     | ✅                  | ❌                             | ❌                   |
| Lazy computed graph         | ✅                  | ❌                             | ❌                   |
| Explicit scheduler control  | ✅                  | ❌                             | ⚠️                  |
| State store abstraction     | ❌                  | ✅                             | ❌                   |
| Stream semantics            | ❌                  | ❌                             | ✅                   |
| Proxy-based mutation        | ❌                  | ⚠️                            | ❌                   |
| Framework required          | ❌                  | ⚠️                            | ❌                   |


<b>Notes</b>

- **intentx-core-z** is an execution kernel: intent is first-class, scheduling is explicit, and reactivity is fine-grained and lazy.
- **Store-based** libraries focus on state containers; async control and orchestration typically rely on external middleware.
- **RxJS** is a stream algebra system with powerful async operators, but intent and scheduling are stream-driven rather than runtime-orchestrated.
- Determinism in **intentx-core-z** is enforced via explicit priority scheduling; other models depend on middleware order or operator chains.
- **intentx-core-z** does not provide a state store abstraction by design — state remains user-owned.

---

## What it is NOT

- Not a state manager
- Not Redux / Zustand
- Not a reducer system
- Not proxy-based reactivity
- Not a UI framework
- Not an event transport layer

---

# Non-goals

`intentx-core-z` intentionally does NOT provide:

- State persistence
- Global store abstraction
- UI rendering layer
- Proxy-based reactivity
- Stream/Rx pipeline semantics
- Middleware plugin system

> If you want a store, build one on top of intentx-core-z.

---

# Philosophy

> intentx-core-z is an execution engine.  
> You own the state. It owns the orchestration.

---

# Architecture Diagram

```text
Transport Layer
   (eventbus / http / worker)
           ↓
Intent Layer
   (intentx-core-z)
           ↓
Reactive Layer
   (signals / computed / effects)
           ↓
State (user-owned)
```

---

# License

MIT