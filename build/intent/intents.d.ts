import type { Scope } from "../scope";
import type { IntentContext, IntentHandler, IntentEffect } from "./effect";
export declare function createIntentBus<S>(getCtx: (payload: any, scope: Scope) => IntentContext<S>): {
    on(type: string, handler: IntentHandler<S>, scope?: Scope): () => void;
    effect(type: string, fx: IntentEffect<S>, scope?: Scope): void;
    emit(type: string, payload?: any, scope?: Scope): Promise<void>;
    scope: Scope;
};
