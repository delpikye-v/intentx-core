export type Middleware<Ctx> = (ctx: Ctx, next: () => Promise<void>) => Promise<void>;
export declare function compose<Ctx>(stack: Middleware<Ctx>[]): (ctx: Ctx, next: () => Promise<void>) => Promise<void>;
