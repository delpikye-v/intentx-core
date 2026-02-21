import { Priority } from "../scheduler";
import type { ReactiveContext, Scheduler } from "./types";
export declare function createReactiveEffect(context: ReactiveContext, scheduler: Scheduler): (fn: () => void, priority?: Priority) => () => void;
