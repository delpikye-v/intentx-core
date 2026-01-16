export declare function createBackendRuntime<S extends object>(state: S, scope?: string): {
    state(): S;
    snapshot(): Readonly<S>;
    setState(fn: (s: S) => void): void;
    replaceState(next: S): void;
    reset(): void;
    emit: (intent: string, payload?: any) => Promise<void>;
    batch(fn: () => void | Promise<void>): Promise<void>;
    onIntent: (intent: string, handler: import("./types").IntentHandler<S, S, any>) => void;
    effect: (intent: string, fx: import("./types").Effect<S, S, any>) => void;
};
