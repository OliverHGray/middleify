import { errorHandler, handle, respond, route } from '../dist/express';
import { createResponse } from 'node-mocks-http';

test('Uses error match if exists', async () => {
    const testErrorStub = jest.fn();
    const fallbackStub = jest.fn();
    const handler = errorHandler(
        handle(TestError, testErrorStub),
        handle(Error, fallbackStub),
    );

    await handler(new TestError(), {} as any, {} as any, () => {});

    expect(testErrorStub).toBeCalledWith({ error: new TestError() }, {}, {});
});

test('Falls back if error match does not exist', async () => {
    const testErrorStub = jest.fn();
    const fallbackStub = jest.fn();
    const handler = errorHandler(
        handle(TestError, testErrorStub),
        handle(Error, fallbackStub),
    );

    await handler(new UnhandledError(), {} as any, {} as any, () => {});

    expect(fallbackStub).toBeCalledWith(
        { error: new UnhandledError() },
        {},
        {},
    );
});

test('error response withMessageFromError takes error message', async () => {
    const handler = errorHandler(
        handle(Error, respond.badRequest.withMessageFromError()),
    );
    const res = createResponse();
    res.send = jest.fn();

    await handler(new Error('Custom message'), {} as any, res, () => {});

    expect(res.send).toBeCalledWith({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Custom message',
    });
});

test('error response withMessage no message omits property', async () => {
    const handler = errorHandler(handle(Error, respond.badRequest()));
    const res = createResponse();
    res.send = jest.fn();

    await handler(new Error('Custom message'), {} as any, res, () => {});

    expect(res.send).toBeCalledWith({
        statusCode: 400,
        error: 'Bad Request',
    });
});

test('error response withMessage adds custom message', async () => {
    const handler = errorHandler(
        handle(Error, respond.badRequest('Another message')),
    );
    const res = createResponse();
    res.send = jest.fn();

    await handler(new Error('Custom message'), {} as any, res, () => {});

    expect(res.send).toBeCalledWith({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Another message',
    });
});

test('error response withMessageFrom adds message from another property', async () => {
    const handler = errorHandler(
        handle(
            Error,
            () => ({ anotherMessage: 'Another message' }),
            respond.badRequest.withMessageFrom('anotherMessage'),
        ),
    );
    const res = createResponse();
    res.send = jest.fn();

    await handler(new Error('Custom message'), {} as any, res, () => {});

    expect(res.send).toBeCalledWith({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Another message',
    });
});

test('error response can be used in custom middleware', async () => {
    const handler = errorHandler(
        handle(Error, (context, req, res) => {
            respond.badRequest(res, 'Another message');
        }),
    );
    const res = createResponse();
    res.send = jest.fn();

    await handler(new Error('Custom message'), {} as any, res, () => {});

    expect(res.send).toBeCalledWith({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Another message',
    });
});

test('success response works', async () => {
    const handler = route(respond.ok('Success!'));
    const res = createResponse();
    res.send = jest.fn();

    await handler({} as any, res, () => {});

    expect(res.send).toBeCalledWith({
        statusCode: 200,
        message: 'Success!',
    });
});

class TestError extends Error {
    test: string = 'hello!';
}

class UnhandledError extends Error {}
