# Middleify

A highly opinionated, typed, clean and reusable middleware library for TypeScript.

Write small, reusable middleware components and chain them together to build a route handler. To maximise reuse and portability, well written routes should only interact with framework specific arguments in the first and last middlewares.

Middleify comes with built-in helpers for common actions such as http responses, mapping property names, and error handling.

## Example

```typescript
// app.ts
import express, { query } from 'express';
import { route, respondWith } from 'middleify/express';
import { exampleMiddleware } from './exampleMiddleware';

const app = express()
    
    .get(
        '/example',
        route(
            (context, req) => ({
                property: 'test',
                queryParameter: req.query.parameter,
            }),
            exampleMiddleware,
            respondWith('result'),
        )
    );

// exampleMiddleware.ts
export const exampleMiddleware = ({ property, queryParameter }: Context) => ({
    result: `${property}: ${queryParameter}`
});

type Context = {
    property: string;
    queryParameter: string;
}
```

## The Route Function

The route function takes a list of functions that it will execute in order when processing a request. These functions could be considered analogous to express middleware, however there are two key differences.

 1. The first parameter is a context object that contains the return value of all previous functions.
 2. There is no next function, the execution of each middleware is completed when it either returns or throws.

The context object is additive, you can think of route like an additive pipe function. I.e.

```typescript
context = {
    ...context,
    fn(context),
}
```

The last function must return a value to the client, otherwise the request will hang.

## Responses

There are various helper functions that can make responding to the client easy. A typical response could look like this:

```typescript
import { route } from 'middleify/express';

route(
    () => ({ 
        databaseObject: {
            property: 'this is some data',
        },
    }),
    ({ databaseObject }, req, res) => res.json(databaseObject),
)
```

### respondWith

The above example can be slightly simplified to the following by using the `respondWith` helper function:

```typescript
import { route, respondWith } from 'middleify/express';

route(
    () => ({ 
        databaseObject: {
            property: 'this is some data',
        },
    }),
    respondWith('databaseObject'),
)
```

This function is fully typed. The code will not compile if `'databaseObject'` does not exist on the context object.

### respond

The respond helper responds with an HTTP error code, optionally taking a `message` and some additional data.

For example, when stubbing out a new endpoint, you could write the following:

```typescript
import { route, respond } from 'middleify/express';

route(
    respond.notImplemented(),
)
```

The example above will return with an HTTP code of 501, with the following payload:

```json
{
    "statusCode": 501,
    "message": "Not Implemented"
}
```

All common HTTP codes are supported, plus most other rarely used codes.

## Mapping

If a reusable middleware function expects a different name for a property in the context, a mapping function can be used to wrap the middleware and map the property to a different key for this middleware only.

```typescript
import { route, respondWith, fn } from 'middleify/express';

route(
    ({}, req) => ({ 
        requestId: req.body.id as string,
    }),
    fn(loadObject).map('requestId', 'id'),
    respondWith('object'),
)

// loadObject.ts
export const loadObject = ({ id }) => ({
    object: readFromDatabase(id),
})

type Context = {
    id: string;
}
```

This function is fully typed and will cause a compile error if the property names don't exist.

## Error Handling

The `errorHandler` function creates an express error handler that catches and handles errors. When handling an error, it will test the type of the `Error` against the type declared in each `handle` function until it finds a type that the Error inherits from. The first matching handler will be invoked and must respond to the client as it is not currently possible to fall through to a subsequent handler. The first argument to the `handle` function is the type of `Error` it handles, all subsequent arguments are middleify middleware.

```typescript
import { errorHandler, handle, respond } from 'middleify/express';
import { ValidationError } from './errors';

export const handleErrors = errorHandler(
    handle(
        ValidationError,
        respond.badRequest.withErrorProperties('message', 'errors'),
    ),

    handle(Error, ({ error }, req, res) => {
        console.error(error.message);
        respond.internal(res);
    }),
);

// errors.ts
export class ValidationError extends Error {
    constructor(public errors: string[]) {
        super('Validation Failed');
    }
}

export class PayloadValidationError extends ValidationError {}

export class AuthenticationError extends Error {}
```

In the above example, when handling a `ValidationError` or `PayloadValidationError`, the first handler will be used. When handling `AuthenticationError` it will fall through to the catch all handler that handles all subclasses of `Error`.

### Helper Functions

The error handler also demonstrates two additional ways to use the `respond` helper.

The `withErrorProperties` function will add any specified property to the response object, in this case it will be the `Error.message` and `ValidationError.errors` properties.

When a `respond.errorCode()` function is invoked with the express `Response` object as the first parameter, it can be used inside of a middleify middleware instead of being a middleware function itself. This is useful if the `Error.message` needs to be logged before responding, as in the example above.
