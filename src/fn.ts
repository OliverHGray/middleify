export const fn: Fn = (stage) => {
    let mappings: [string, string][] = [];
    const run = (context: any) => {
        return stage(
            mappings.reduce(
                (newContext, [prop, newProp]) => ({
                    ...newContext,
                    [newProp]: context[prop],
                }),
                context,
            ),
        );
    };
    run.map = (prop: any, newProp: any) => () => {
        mappings = [...mappings, [prop, newProp]];
        return run;
    };
    return run;
};

export interface Fn {
    <Context, Result>(middleware: (context: Context) => Result): WrappedFn<
        Context,
        Result
    >;
}

export interface WrappedFn<Context, Result> {
    (context: Context): Result;

    map: FnMapper<Context, Result>;
}

export interface FnMapper<Context, Result> {
    <Prop extends string, NewProp extends keyof Context, Value>(
        prop: Prop,
        newProp: NewProp,
    ): () => WrappedFn<MappedContext<Context, Prop, NewProp, Value>, Result>;
}

export type MappedContext<
    Context,
    Prop extends string,
    NewProp extends keyof Context,
    Value
> = Omit<Context, NewProp> & { [key in Prop]: Value };
