import "tsconfig-paths/register";
import React from "react";
import renderer from "react-test-renderer";
import { JSDOM } from "jsdom";

import { RawHtml, DOMParserContext } from "./entrypoint";

describe("<RawHtml/>", () => {
  it("renders HTML snippets with global DOMParser()", () => {
    const tree = renderer
      .create(
        <DOMParserContext.Provider value={new DOMParser()}>
          <RawHtml html="<p class='hello'>Hello, <strong>React</strong> world!</p>" />
        </DOMParserContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders HTML snippets with jsdom", () => {
    const jsdom = new JSDOM("");
    const tree = renderer
      .create(
        <DOMParserContext.Provider value={new jsdom.window.DOMParser()}>
          <RawHtml html="<p class='hello'>Hello, <strong>React</strong> world!</p>" />
        </DOMParserContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
