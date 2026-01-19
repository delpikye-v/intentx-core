import { Priority } from "../scheduler/scheduler";
export declare function reactiveEffect(fn: () => void, priority?: Priority): () => void;
