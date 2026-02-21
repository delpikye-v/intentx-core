import { Priority } from "../scheduler";
import type { ReactiveContext, Scheduler } from "./types";
export type Signal<T> = (() => T) & {
    set(value: T, priority?: Priority): void;
    subscribe(fn: () => void): () => void;
};
export declare function createSignalFactory(context: ReactiveContext, scheduler: Scheduler): <T>(initial: T) => Signal<T>;
