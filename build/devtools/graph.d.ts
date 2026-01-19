export type GraphNode = {
    id: number;
    type: string;
    label?: string;
    deps: Set<GraphNode>;
};
export declare function trackNode(type: string, label?: string): GraphNode;
export declare function linkNodes(from: GraphNode, to: GraphNode): void;
