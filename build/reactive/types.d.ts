export type EffectRunner = () => void;
export type ReactiveContext = {
    activeEffect: EffectRunner | null;
    activeDeps: Set<Set<EffectRunner>> | null | undefined;
};
export type Scheduler = (job: () => void, priority?: any) => void;
