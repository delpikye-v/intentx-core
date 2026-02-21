import { Priority } from "./scheduler";
export declare function batch(fn: () => void): void;
export declare function queueJob(job: () => void, p: Priority): void;
