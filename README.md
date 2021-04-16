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

## Responses

TODO

## Mapping

TODO

## Error Handling

TODO