import type { Priority } from "../scheduler/scheduler";
export type Signal<T> = (() => T) & {
    set(value: T, priority?: Priority): void;
    subscribe(fn: () => void): () => void;
};
export declare function signal<T>(initial: T): Signal<T>;
