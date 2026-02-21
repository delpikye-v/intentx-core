export declare function createReactiveEffect(context: any, scheduler: (job: () => void, p?: any) => void): (fn: () => void, priority?: any) => () => void;
