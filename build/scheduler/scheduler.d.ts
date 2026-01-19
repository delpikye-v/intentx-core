export type Priority = "high" | "normal" | "low";
type Job = () => void;
export declare function schedule(job: Job, p?: Priority): void;
export {};
