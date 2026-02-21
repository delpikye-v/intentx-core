export type EffectRunner = () => void;
export declare const reactiveContext: {
    activeEffect: EffectRunner | null;
    activeDeps: Set<Set<EffectRunner>> | null;
};
