import { errorHandler, handle } from '../src/express';

test('Uses error match if exists', () => {
    const testErrorStub = jest.fn();
    const fallbackStub = jest.fn();
    const handler = errorHandler(
        handle(TestError, testErrorStub),
        handle(Error, fallbackStub),
    );
    
    handler(new TestError(), {} as any, {} as any, () => {});
    
    expect(testErrorStub).toBeCalledWith(new TestError(), {}, {});
});

test('Falls back if error match does not exist', () => {
    const testErrorStub = jest.fn();
    const fallbackStub = jest.fn();
    const handler = errorHandler(
        handle(TestError, testErrorStub),
        handle(Error, fallbackStub),
    );
    
    handler(new UnhandledError(), {} as any, {} as any, () => {});
    
    expect(fallbackStub).toBeCalledWith(new UnhandledError(), {}, {});
});

class TestError extends Error {
    test: string = 'hello!';
}

class UnhandledError extends Error {}
