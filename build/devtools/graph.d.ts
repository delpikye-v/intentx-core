export type GraphNode = {
    id: number;
    type: "signal" | "computed" | "effect";
    deps: Set<GraphNode>;
};
export declare const graphContext: {
    activeNode: GraphNode | null;
    nodes: Set<GraphNode>;
};
export declare function createNode(type: GraphNode["type"]): GraphNode;
export declare function linkNodes(from: GraphNode, to: GraphNode): void;
