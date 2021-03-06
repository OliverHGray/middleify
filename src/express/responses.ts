import { Request, Response } from 'express';

const createRespond = (statusCode: number, error?: string): Respond => {
    const sendResponse = (res: Response, properties: object) =>
        res.status(statusCode).send({
            statusCode,
            ...(error ? { error } : {}),
            ...properties,
        });

    const respond: any = (
        res: Response | string,
        message?: any,
        data?: any,
    ) => {
        if (!res || typeof res === 'string') {
            data = message;
            message = res;
            return (context: any, req: Request, res: Response) =>
                sendResponse(res, { message, ...data });
        } else {
            sendResponse(res, { message, ...data });
            return;
        }
    };

    const takeProperties = (properties: string[], objectWithProperties: any) =>
        properties.reduce(
            (object, property) => ({
                ...object,
                [property]: objectWithProperties[property],
            }),
            {},
        );

    respond.withErrorProperties = <Properties extends string[]>(
        ...properties: Properties
    ) => (
        context: {
            error: {
                [key in Properties[number]]: string;
            };
        },
        req: Request,
        res: Response,
    ) => sendResponse(res, takeProperties(properties, context.error));

    respond.withProperties = <Properties extends string[]>(
        ...properties: Properties
    ) => (
        context: { [key in Properties[number]]: string },
        req: Request,
        res: Response,
    ) => sendResponse(res, takeProperties(properties, context));

    return respond;
};

interface Respond {
    (res: Response, message?: string, data?: any): void;

    (message?: string, data?: any): (
        context: any,
        req: Request,
        res: Response,
    ) => void;

    withErrorProperties: <Properties extends string[]>(
        ...properties: Properties
    ) => (
        context: {
            error: {
                [key in Properties[number]]: any;
            };
        },
        req: Request,
        res: Response,
    ) => void;

    withProperties: <Properties extends string[]>(
        ...properties: Properties
    ) => (
        context: {
            [key in Properties[number]]: any;
        },
        req: Request,
        res: Response,
    ) => void;
}

export const respond = {
    ok: createRespond(200),
    created: createRespond(201),
    accepted: createRespond(202),
    nonAuthoritativeInformation: createRespond(203),
    noContent: createRespond(204),
    resetContent: createRespond(205),
    partialContent: createRespond(206),
    multiStatus: createRespond(207),
    alreadyReported: createRespond(208),
    imUsed: createRespond(226),

    badRequest: createRespond(400, 'Bad Request'),
    unauthorized: createRespond(401, 'Unauthorized'),
    paymentRequired: createRespond(402, 'Payment Required'),
    forbidden: createRespond(403, 'Forbidden'),
    notFound: createRespond(404, 'Not Found'),
    methodNotAllowed: createRespond(405, 'Method Not Allowed'),
    notAcceptable: createRespond(406, 'Not Acceptable'),
    proxyAuthenticationRequired: createRespond(
        407,
        'Proxy Authentication Required',
    ),
    requestTimeout: createRespond(408, 'Request Timeout'),
    conflict: createRespond(409, 'Conflict'),
    gone: createRespond(410, 'Gone'),
    lengthRequired: createRespond(411, 'Length Required'),
    preconditionFailed: createRespond(412, 'Precondition Failed'),
    payloadTooLarge: createRespond(413, 'Payload Too Large'),
    uriTooLong: createRespond(414, 'URI Too Long'),
    unsupportedMediaType: createRespond(415, 'Unsupported Media Type'),
    rangeNotSatisfiable: createRespond(416, 'Range Not Satisfiable'),
    expectationFailed: createRespond(417, 'Expectation Failed'),
    misdirectedRequest: createRespond(421, 'Misdirected Request'),
    unprocessableEntity: createRespond(422, 'Unprocessable Entity'),
    locked: createRespond(423, 'Locked'),
    failedDependency: createRespond(424, 'Failed Dependency'),
    tooEarly: createRespond(425, 'Too Early'),
    preconditionRequired: createRespond(428, 'Precondition Required'),
    tooManyRequests: createRespond(429, 'Too Many Requests'),
    illegal: createRespond(451, 'Unavailable For Legal Reasons'),

    internal: createRespond(500, 'Internal Server Error'),
    notImplemented: createRespond(501, 'Not Implemented'),
    badGateway: createRespond(502, 'Bad Gateway'),
    serviceUnavailable: createRespond(503, 'Service Unavailable'),
    gatewayTimeout: createRespond(504, 'Gateway Timeout'),
};

export const respondWith = <Property extends string>(property: Property) => (
    context: { [key in Property]: any },
    req: Request,
    res: Response,
) => res.json(context[property]);

export const redirectTo = <Property extends string>(property: Property) => (
    context: { [key in Property]: string },
    req: Request,
    res: Response,
) => res.redirect(context[property]);
