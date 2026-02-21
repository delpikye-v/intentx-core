import type { ReactiveContext } from "./types";
export declare function createReactiveRuntime(): {
    signal: <T>(initial: T) => import("./createSignalFactory").Signal<T>;
    createComputed: <T>(getter: () => T) => () => T;
    reactiveEffect: (fn: () => void, priority?: import("../scheduler/scheduler").Priority) => () => void;
    context: ReactiveContext;
};
