# react-from-html

[![Build Status](https://travis-ci.org/bitjourney/react-from-html.svg?branch=master)](https://travis-ci.org/bitjourney/react-from-html) [![npm version](https://badge.fury.io/js/%40bitjourney%2Freact-from-html.svg)](https://badge.fury.io/js/%40bitjourney%2Freact-from-html)

This module provides a way to embed HTML snippets into React elements.
Its behavior alikes `dangerouslySetInnerHTML`, but does as normal React elements.
In other words, this is the inverse of `ReactDOMServer.renderToString()`, which
builds an HTML snippet from a React element.

## SYNOPSIS

```tsx
import React from "react";
import { ReactFromHtml } from "react-from-html";

const reactFromHtml = new ReactFromHtml();

const htmlSnippet = "<p>Hello, world!</p>";

class Foo extends React.Component {
  render() {
    if (Number.parseInt(React.version) >= 16) {
     return reactFromHtml.parseToFragment(htmlSnippet);
    } else {
      return <div>{reactFromHtml.parseToNodeList(htmlSnippet)}</div>;
    }
  }
}
```

## See Also

* https://www.npmjs.com/package/html2react
* https://www.npmjs.com/package/react-html-parser

## LICENSE

ISC License

Copyright (c) 2018, Bit Journey, Inc.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
