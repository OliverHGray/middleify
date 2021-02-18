import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ExpressMiddleware, route } from './route';

export const errorHandler = (
    ...handlers: WrappedErrorHandler[]
): ErrorRequestHandler => {
    return async (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        for (const handler of handlers) {
            if (await handler(error, request, response, next)) {
                return;
            }
        }
        return next(error);
    };
};

export interface Handle {
    <ThisError extends Error>(
        errorConstructor: ErrorConstructor<ThisError>,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3, T4>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
        middleware4: ExpressMiddleware<{ error: ThisError } & T1 & T2 & T3, T4>,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3, T4, T5>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
        middleware4: ExpressMiddleware<{ error: ThisError } & T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4,
            T5
        >,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3, T4, T5, T6>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
        middleware4: ExpressMiddleware<{ error: ThisError } & T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4,
            T5
        >,
        middleware6: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5,
            T6
        >,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3, T4, T5, T6, T7>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
        middleware4: ExpressMiddleware<{ error: ThisError } & T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4,
            T5
        >,
        middleware6: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5,
            T6
        >,
        middleware7: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6,
            T7
        >,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3, T4, T5, T6, T7, T8>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
        middleware4: ExpressMiddleware<{ error: ThisError } & T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4,
            T5
        >,
        middleware6: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5,
            T6
        >,
        middleware7: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6,
            T7
        >,
        middleware8: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6 & T7,
            T8
        >,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
        middleware4: ExpressMiddleware<{ error: ThisError } & T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4,
            T5
        >,
        middleware6: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5,
            T6
        >,
        middleware7: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6,
            T7
        >,
        middleware8: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6 & T7,
            T8
        >,
        middleware9: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8,
            T9
        >,
    ): WrappedErrorHandler;

    <ThisError extends Error, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
        errorConstructor: ErrorConstructor<ThisError>,
        middleware1: ExpressMiddleware<{ error: ThisError }, T1>,
        middleware2: ExpressMiddleware<{ error: ThisError } & T1, T2>,
        middleware3: ExpressMiddleware<{ error: ThisError } & T1 & T2, T3>,
        middleware4: ExpressMiddleware<{ error: ThisError } & T1 & T2 & T3, T4>,
        middleware5: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4,
            T5
        >,
        middleware6: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5,
            T6
        >,
        middleware7: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6,
            T7
        >,
        middleware8: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6 & T7,
            T8
        >,
        middleware9: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8,
            T9
        >,
        middleware10: ExpressMiddleware<
            { error: ThisError } & T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8 & T9,
            T10
        >,
    ): WrappedErrorHandler;
}

export const handle: Handle = <ThisError extends Error>(
    errorConstructor: ErrorConstructor<ThisError>,
    ...middleware: ExpressMiddleware<any, any>[]
): WrappedErrorHandler => async (error, request, response, next) => {
    if (error instanceof errorConstructor) {
        await (route as any)(() => ({ error }), ...middleware)(
            request,
            response,
            next,
        );
        return true;
    }
    return false;
};

export type ErrorConstructor<Error> = new (...args: any[]) => Error;

export type WrappedErrorHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction,
) => Promise<boolean>;
