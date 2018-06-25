import "tsconfig-paths";
import renderer from "react-test-renderer";
import { ReactFromHtml } from "../src";

describe("ReactFromHtml#parse", () => {
  const reactFromHtml = new ReactFromHtml();

  it("renders single block of HTML elements correctly", () => {
    const tree = renderer
      .create(
        reactFromHtml.parse("<p>Hello, <strong>React</strong> world!</p>")
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders multiple blocks of HTML elements correctly", () => {
    const tree = renderer
      .create(
        reactFromHtml.parse(`
          <p>Hello, <strong>React</strong> world!</p>
          <p>Hello, <strong>React</strong> world!</p>
          <p>Hello, <strong>React</strong> world!</p>
        `)
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders <script/> with dangerouslySetInnerHTML", () => {
    const tree = renderer
      .create(
        reactFromHtml.parse(
          "<script>console.log('Hello <strong>React</strong> world!');</script>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders <style/> with dangerouslySetInnerHTML", () => {
    const tree = renderer
      .create(
        reactFromHtml.parse(
          "<style>/* Hello <strong>React</strong> world! */</style>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders <textarea/> with defaultValue, instead of children", () => {
    const tree = renderer
      .create(
        reactFromHtml.parse(
          "<textarea>/* Hello <strong>React</strong> world! */</textarea>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
