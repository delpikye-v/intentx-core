export type IntentRuntimeCtx<W, R> = {
    getState(): R;
    setState(fn: (s: W) => void): void;
    emit(intent: string, payload?: any): Promise<void>;
};
export type EffectCtx<W = any, R = W, P = any> = {
    state: Readonly<R>;
    payload: P;
    signal: AbortSignal;
    scope: string;
    emit(intent: string, payload?: any): Promise<void>;
    setState(fn: (s: W) => void): void;
};
export type IntentHandler<W = any, R = W, P = any> = (ctx: EffectCtx<W, R, P>) => void | Promise<void>;
export type Effect<W = any, R = W, P = any> = (next: IntentHandler<W, R, P>) => IntentHandler<W, R, P>;
