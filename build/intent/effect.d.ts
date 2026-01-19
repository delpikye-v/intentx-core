export type IntentContext<S, P = any> = {
    state: S;
    payload: P;
    emit(type: string, payload?: any): Promise<void>;
    setState(fn: (s: S) => void): void;
    signal: AbortSignal;
};
export type IntentHandler<S> = (ctx: IntentContext<S>) => any | Promise<any>;
export type IntentEffect<S> = (next: IntentHandler<S>) => IntentHandler<S>;
export declare function intentEffect<S>(body: (ctx: IntentContext<S>) => void | Promise<void>): any;
