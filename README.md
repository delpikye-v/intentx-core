# 🧬 intentx-core-z

[![NPM](https://img.shields.io/npm/v/intentx-core-z.svg)](https://www.npmjs.com/package/intentx-core-z) ![Downloads](https://img.shields.io/npm/dt/intentx-core-z.svg)

<a href="https://codesandbox.io/p/devbox/vjmq53" target="_blank">LIVE EXAMPLE</a>

**Minimal intent & reactive execution core for logic runtimes.**

---

## 🧠 What is this?

`intentx-core-z` is a **low-level execution engine** focused on *how logic runs*, not how UI renders or how state is stored.

It provides:
- Intent-based execution
- Effect orchestration (debounce, throttle, cancellation)
- Explicit reactivity (computed + effects)
- Deterministic scheduling

No framework assumptions. No hidden magic.

---

## 🚀 Use Cases

- Backend command / intent handling
- Domain & business rule engines
- Workflow / automation runtimes
- Framework adapters (React, Vue, Workers, CLI)
- Testable logic cores (no UI dependency)

---

## 🧠 Mental Model

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

This library is about **execution**, not data modeling.

---

## 📦 Installation

```bash
npm install intentx-core-z
```

---

## 1️⃣ Intent Execution

```ts
import { createIntentBus } from "intentx-core-z";

type State = { count: number };
let state: State = { count: 0 };

const bus = createIntentBus<State>((payload, scope) => ({
  state,
  payload,
  signal: new AbortController().signal,
  emit: (type, payload) => bus.emit(type, payload, scope),
  setState(fn) {
    fn(state);
  },
}));

bus.on("increment", ({ setState }) => {
  setState(s => { s.count++ });
});

await bus.emit("increment");
console.log(state.count); // 1
```

---

## 2️⃣ Async Effects

```ts
import { intentEffect } from "intentx-core-z";

bus.effect(
  "search",
  intentEffect(async ({ payload }) => {
    console.log("Searching:", payload);
  })
    .debounce(300)
    .throttle(1000)
    .takeLatest()
);
```

### Supported effects
- `debounce(ms)`
- `throttle(ms)`
- `takeLatest()`
- `takeLeading()`

---

## 3️⃣ Reactive Computation

```ts
import { createComputed, reactiveEffect } from "intentx-core-z";

let count = 1;

const double = createComputed(() => count * 2);

reactiveEffect(() => {
  console.log("double =", double());
});

count = 2; // logs: double = 4
```

No proxies. Explicit dependency tracking.

---

## 4️⃣ Scheduling & Batching

```ts
import { batch, queueJob } from "intentx-core-z";

batch(() => {
  queueJob(() => console.log("low"), "low");
  queueJob(() => console.log("high"), "high");
});
```

---

## 5️⃣ Scopes (Isolation)

```ts
import { createScope } from "intentx-core-z";

const admin = createScope("admin");

bus.on("reset", () => {
  state.count = 0;
}, admin);

await bus.emit("reset", null, admin);
```

---

## 🔌 Using with eventbus-z (Signal Layer)

`eventbus-z` is a perfect **signal transport** for `intentx-core-z`.

```ts
import EventBus from "eventbus-z";
import { createIntentBus } from "intentx-core-z";

const bus = createIntentBus(ctxPayload => ({
  ...ctxPayload,
  emit: (type, payload) => EventBus.$emit(type, payload),
}));

EventBus.$on("INCREMENT", payload => {
  bus.emit("increment", payload);
});
```

**Recommended layering:**

```
eventbus-z        → signal transport
intentx-core-z   → execution & orchestration
your state       → domain logic
framework        → UI
```

---

## 🧪 Devtools Graph (Optional)

```ts
import { trackNode, linkNodes } from "intentx-core-z";

const a = trackNode("state", "count");
const b = trackNode("computed", "double");

linkNodes(a, b);
```

---

## 🚫 What this library is NOT

❌ Not a UI state manager  
❌ Not framework-specific  
❌ Not opinionated about data models  

---

## 📜 License

MIT
