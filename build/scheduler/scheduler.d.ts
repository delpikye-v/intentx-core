export type Priority = "high" | "normal" | "low";
type Job = () => void;
export declare function schedule(job: Job, priority?: Priority): void;
export {};
