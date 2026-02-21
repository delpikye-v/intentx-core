import type { ReactiveContext, Scheduler } from "./types";
export declare function createComputedFactory(context: ReactiveContext, scheduler: Scheduler): <T>(getter: () => T) => () => T;
