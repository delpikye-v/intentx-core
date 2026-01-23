import type { Scope } from "../scope";
export type IntentContext<S, P = any> = {
    state: S;
    payload: P;
    emit(type: string, payload?: any): Promise<void>;
    setState(fn: (s: S) => void): void;
    signal: AbortSignal;
    scope: Scope;
};
export type IntentHandler<S> = (ctx: IntentContext<S>) => any | Promise<any>;
export type IntentEffect<S> = (next: IntentHandler<S>) => IntentHandler<S>;
