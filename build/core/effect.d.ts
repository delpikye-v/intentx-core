import type { Effect } from "./types";
export declare function composeEffects<W, R, P>(effects: Effect<W, R, P>[]): Effect<W, R, P>;
export declare function takeLatest<W, R, P>(): Effect<W, R, P>;
export declare function debounce<W, R, P>(ms: number): Effect<W, R, P>;
export declare function retry<W, R, P>(count?: number): Effect<W, R, P>;
