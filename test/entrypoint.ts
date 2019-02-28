import React from "react";

function missing(name: string) {
  throw new Error(`Missing ${name}: make clean && make build will fix it`);
}

export const ReactFromHtml =
  (() => {
    if (process.env.TEST_DIST) {
      return require("..").ReactFromHtml;
    } else {
      return require("../src").ReactFromHtml;
    }
  })() || missing("ReactFromHtml");

export const RawHtml: React.FC<{ html: string }> =
  (() => {
    if (process.env.TEST_DIST) {
      return require("..").RawHtml;
    } else {
      return require("../src").RawHtml;
    }
  })() || missing("RawHtml");

export const DOMParserContext: React.Context<DOMParser> =
  (() => {
    if (process.env.TEST_DIST) {
      return require("..").DOMParserContext;
    } else {
      return require("../src").DOMParserContext;
    }
  })() || missing("DOMParserContext");
