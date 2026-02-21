import { Scope } from "../scope";
export type IntentContext<S, P = any> = {
    state: S;
    payload: P;
    emit(type: string, payload?: any): Promise<void>;
    setState(fn: (s: S) => void): void;
    signal?: AbortSignal;
    scope: Scope;
};
export type IntentHandler<S> = (context: IntentContext<S>) => any | Promise<any>;
export type IntentEffect<S> = (next: IntentHandler<S>) => IntentHandler<S>;
export type EffectBuilder<S> = {
    (): IntentEffect<S>;
    debounce(ms: number): EffectBuilder<S>;
    throttle(ms: number): EffectBuilder<S>;
    takeLatest(): EffectBuilder<S>;
    takeLeading(): EffectBuilder<S>;
};
