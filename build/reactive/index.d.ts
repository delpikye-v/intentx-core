import { createReactiveRuntime } from "./createReactiveRuntime";
export declare const signal: <T>(initial: T) => import("./createSignalFactory").Signal<T>;
export declare const createComputed: <T>(getter: () => T) => () => T;
export declare const reactiveEffect: (fn: () => void, priority?: import("..").Priority) => () => void;
export declare const computed: <T>(getter: () => T) => () => T;
export declare const effect: (fn: () => void, priority?: import("..").Priority) => () => void;
export { createReactiveRuntime };
export type { Signal } from "./createSignalFactory";
export * from "./types";
