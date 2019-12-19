# @itzsaga/use-lazy-pagination

[![Greenkeeper badge][greenkeeper-image]][greenkeeper-link] [![npm version][npm-version-image]][npm-version-link]

Bi-directional pagination hook for use in React using GraphQL & the Relay cursor-based pagination. Expectin an Apollo `useLazyQuery` function. Thank to a [blog post][inspiration] by Tim Specht for the inspiration.

## Installation

```bash
$ npm i @itzsaga/use-lazy-pagination
```

or

```bash
$ yarn add @itzsaga/use-lazy-pagination
```

## Usage

The hook expects a single argument, the query function returned from the `@apollo/react-hooks` `useLazyQuery` hook.

```javascript
const { goBack, goForward } = useLazyPagination(queryPosts);
```

### Return

The hook returns an object with 4 things on it.

| Return Value    | Description                                             |
| :-------------- | :------------------------------------------------------ |
| currentPage     | The current page you are on in the stack, defaults to 1 |
| goBack          | A function that moves you back a page                   |
| goForward       | A function that move you forward a page                 |
| resetPagination | A function that resets the pagination state             |

Note: `goForward` expects a single argument of the `endCursor` provided in the `pageInfo` from the query. This is how the stack is built.

## Example

```javascript
import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import useLazyPagination from "@itzsaga/use-lazy-pagination";

function App() {
  const [ queryPosts, { data, error, loading } ] = useLazyQuery(QUERY_POSTS);
  const { currentPage, goBack, goForward, resetPagination } = useLazyPagination(
    queryPosts
  );

  if (error) return <div>Error.</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => goBack()}>
        Back
      </button>
      <div>You are on page {currentPage}.</div>
      <button onClick={() => goForward(data.Posts.pageInfo.endCursor)}>
        Forward
      </button>
    </div>
  );
}
```

## Contributing

Bug reports and pull requests are welcome on GitHub at [https://github.com/itzsaga/use-lazy-pagination][repo-url]. If you would like to help with this project see our [Contributing][contributing] doc for more info.

## License

The app is available as open source under the terms of the [MIT License][license].

[greenkeeper-image]: https://badges.greenkeeper.io/itzsaga/use-lazy-pagination.svg
[greenkeeper-link]: https://greenkeeper.io/
[npm-version-image]: https://badge.fury.io/js/%40itzsaga%2Fuse-lazy-pagination.svg
[npm-version-link]: https://badge.fury.io/js/%40itzsaga%2Fuse-lazy-pagination
[inspiration]: https://engineering.dubsmash.com/bi-directional-pagination-using-graphql-relay-b523c919c96
[repo-url]: https://github.com/itzsaga/use-lazy-pagination
[contributing]: ./CONTRIBUTING.md
[license]: ./LICENSE
