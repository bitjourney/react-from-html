import "tsconfig-paths/register";
import React from "react";
import renderer from "react-test-renderer";

import { RawHtml, DOMParserContext } from "./entrypoint";

describe("<RawHtml/>", () => {
  it("renders single block of HTML elements correctly", () => {
    const tree = renderer
      .create(
        <DOMParserContext.Provider value={new DOMParser()}>
          <RawHtml html="<p class='hello'>Hello, <strong>React</strong> world!</p>" />
        </DOMParserContext.Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
