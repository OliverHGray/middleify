import { NextFunction, Request, RequestHandler, Response } from 'express';

export const route: Route = (...middleware: ExpressMiddleware<any, any>[]) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const processMiddleware = async (
            context: any,
            remainingMiddleware: ExpressMiddleware<any, any>[],
        ): Promise<any> => {
            if (remainingMiddleware.length) {
                return processMiddleware(
                    {
                        ...context,
                        ...(await remainingMiddleware[0](
                            context,
                            request,
                            response,
                        )),
                    },
                    remainingMiddleware.slice(1),
                );
            }
        };

        try {
            await processMiddleware({}, middleware);
        } catch (error) {
            return next(error);
        }
    };
};

export interface Route {
    (): RequestHandler;

    <T1>(middleware1: ExpressMiddleware<{}, T1>): RequestHandler;

    <T1, T2>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
    ): RequestHandler;

    <T1, T2, T3>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
    ): RequestHandler;

    <T1, T2, T3, T4>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
        middleware4: ExpressMiddleware<T1 & T2 & T3, T4>,
    ): RequestHandler;

    <T1, T2, T3, T4, T5>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
        middleware4: ExpressMiddleware<T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<T1 & T2 & T3 & T4, T5>,
    ): RequestHandler;

    <T1, T2, T3, T4, T5, T6>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
        middleware4: ExpressMiddleware<T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<T1 & T2 & T3 & T4, T5>,
        middleware6: ExpressMiddleware<T1 & T2 & T3 & T4 & T5, T6>,
    ): RequestHandler;

    <T1, T2, T3, T4, T5, T6, T7>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
        middleware4: ExpressMiddleware<T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<T1 & T2 & T3 & T4, T5>,
        middleware6: ExpressMiddleware<T1 & T2 & T3 & T4 & T5, T6>,
        middleware7: ExpressMiddleware<T1 & T2 & T3 & T4 & T5 & T6, T7>,
    ): RequestHandler;

    <T1, T2, T3, T4, T5, T6, T7, T8>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
        middleware4: ExpressMiddleware<T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<T1 & T2 & T3 & T4, T5>,
        middleware6: ExpressMiddleware<T1 & T2 & T3 & T4 & T5, T6>,
        middleware7: ExpressMiddleware<T1 & T2 & T3 & T4 & T5 & T6, T7>,
        middleware8: ExpressMiddleware<T1 & T2 & T3 & T4 & T5 & T6 & T7, T8>,
    ): RequestHandler;

    <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
        middleware4: ExpressMiddleware<T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<T1 & T2 & T3 & T4, T5>,
        middleware6: ExpressMiddleware<T1 & T2 & T3 & T4 & T5, T6>,
        middleware7: ExpressMiddleware<T1 & T2 & T3 & T4 & T5 & T6, T7>,
        middleware8: ExpressMiddleware<T1 & T2 & T3 & T4 & T5 & T6 & T7, T8>,
        middleware9: ExpressMiddleware<
            T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8,
            T9
        >,
    ): RequestHandler;

    <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        middleware1: ExpressMiddleware<{}, T1>,
        middleware2: ExpressMiddleware<T1, T2>,
        middleware3: ExpressMiddleware<T1 & T2, T3>,
        middleware4: ExpressMiddleware<T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<T1 & T2 & T3 & T4, T5>,
        middleware6: ExpressMiddleware<T1 & T2 & T3 & T4 & T5, T6>,
        middleware7: ExpressMiddleware<T1 & T2 & T3 & T4 & T5 & T6, T7>,
        middleware8: ExpressMiddleware<T1 & T2 & T3 & T4 & T5 & T6 & T7, T8>,
        middleware9: ExpressMiddleware<
            T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8,
            T9
        >,
        middleware10: ExpressMiddleware<
            T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9,
            T10
        >,
    ): RequestHandler;
}

export type ExpressMiddleware<Context, Result extends {}> = (
    context: Context,
    request: Request,
    response: Response,
) => Promise<Result> | Result;
