import { Priority } from "./scheduler/scheduler";
export declare function batch(fn: () => void): void;
export declare function queueJob(job: () => void, priority: Priority): void;
