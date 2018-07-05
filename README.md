# rect-from-html

[![Build Status](https://travis-ci.org/bitjourney/react-from-html.svg?branch=master)](https://travis-ci.org/bitjourney/react-from-html)

This module provides a way to embed HTML snippets into React elements.
Its behavior alikes `dangerouslySetInnerHTML`, but does as normal React elements.

## SYNOPSIS

```tsx
import React from "react";
import { ReactFromHtml } from "react-from-html";

const reactFromHtml = new ReactFromHtml();

const htmlSnippet = "<p>Hello, world!</p>";

class Foo extends React.Component {
  render() {
    return <>{reactFromHtml.parse(htmlSnippet)}</>;
  }
}
```

## See Also

* https://www.npmjs.com/package/html2react
* https://www.npmjs.com/package/react-html-parser
