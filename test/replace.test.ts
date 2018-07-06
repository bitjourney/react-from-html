import "tsconfig-paths/register";
import ReactDOMServer from "react-dom/server";
import { ReactFromHtml } from "./entrypoint";

describe("ReactFromHtml#parseToFragment with the replace parameter", () => {
  const reactFromHtml = new ReactFromHtml({
    replace(node: Node, props: object) {
      if (node.nodeName === "SCRIPT") {
        return "--censored--";
      } else {
        return this.nodeToReactNode(node, props);
      }
    }
  });

  it("renders single block of HTML elements correctly", () => {
    const html = ReactDOMServer.renderToStaticMarkup(
      reactFromHtml.parseToFragment(
        "Hello, <script>alert('script!')</script> world!"
      )
    );
    expect(html).toStrictEqual("Hello, --censored-- world!");
  });
});
