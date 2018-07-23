import "tsconfig-paths/register";
import renderer from "react-test-renderer";
import { ReactFromHtml } from "./entrypoint";

describe("ReactFromHtml#parseToFragment", () => {
  const reactFromHtml = new ReactFromHtml();

  it("renders single block of HTML elements correctly", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(
          "<p class='hello'>Hello, <strong>React</strong> world!</p>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders multiple blocks of HTML elements correctly", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(`
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
        reactFromHtml.parseToFragment(
          "<script>console.log('Hello <strong>React</strong> world!');</script>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders <style/> with dangerouslySetInnerHTML", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(
          "<style>/* Hello <strong>React</strong> world! */</style>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders <textarea/> with defaultValue, instead of children", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(
          "<textarea>/* Hello <strong>React</strong> world! */</textarea>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders <input/> with defaultValue", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(
          "<input type='text' value='foo' size='10' disabled/>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders for as htmlFor", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(
          "<label for='foo'><input id='foo'/></label>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("does not render react-reserved attributes", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment("<div innerHTML=\"<input id='foo'/>\"/>")
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders elements with the style attribute", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(
          "<label style='color: red; font-size: 20px; -webkit-font-smoothing: antialiased; opacity: 0.5; font-weight: normal; z-index: 99'>Hello, world!</div>"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Text nodes", () => {
    const tree = renderer
      .create(reactFromHtml.parseToFragment("Hello, world!"))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Comment nodes", () => {
    const tree = renderer
      .create(reactFromHtml.parseToFragment("<!-- Hello, world! -->"))
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders Text and Comment nodes", () => {
    const tree = renderer
      .create(
        reactFromHtml.parseToFragment(
          "<!-- component -->Hello<!-- comment -->, world!<!-- /component -->"
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
