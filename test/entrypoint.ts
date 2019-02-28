import React from "react";

export const ReactFromHtml = (() => {
  if (process.env.TEST_DIST) {
    return require("..").ReactFromHtml;
  } else {
    return require("../src").ReactFromHtml;
  }
})();

export const RawHtml: React.FC<{ html: string }> = (() => {
  if (process.env.TEST_DIST) {
    return require("..").RawHtml;
  } else {
    return require("../src").RawHtml;
  }
})();

export const DOMParserContext: React.Context<DOMParser> = (() => {
  if (process.env.TEST_DIST) {
    return require("..").DOMParserContext;
  } else {
    return require("../src").DOMParserContext;
  }
})();
