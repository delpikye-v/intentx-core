import type { GraphNode } from "../devtools/graph";
export declare const reactiveContext: {
    activeNode: GraphNode | null;
    activeEffect: (() => void) | null;
};
