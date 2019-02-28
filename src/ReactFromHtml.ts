import React from "react";
import { DynamicProps } from "./DynamicProps";
import { extractPropsFromElement } from "./extractPropsFromElement";
import sha1 from "crypto-js/sha1";
import hex from "crypto-js/enc-hex";

function sha1hex(s: string): string {
  return hex.stringify(sha1(s));
}

export interface ReactFromHtmlOptions {
  replace(node: Node, props: DynamicProps): React.ReactNode;
  digest(node: Node, index: number): string;
  domParser: DOMParser;
}

export class ReactFromHtml implements ReactFromHtmlOptions {
  readonly replace: (node: Node, props: DynamicProps) => React.ReactNode;
  readonly digest: (node: Node, index: number) => string;
  readonly domParser: DOMParser;

  constructor(options: Partial<ReactFromHtmlOptions> = {}) {
    this.replace = options.replace || this.nodeToReactNode.bind(this);
    this.digest = options.digest || this.sha1digest.bind(this);

    // NOTE: DOMParser does not exist on NodeJS environment.
    this.domParser = options.domParser || new DOMParser();
  }

  private sha1digest(node: Node, index: number): string {
    if (node.nodeName === "#comment") {
      return `${index}/${node.nodeName}`;
    } else if (node.nodeName === "#text") {
      return `${index}/${node.nodeName}/${sha1hex((node as Text).data)}`;
    } else {
      return `${index}/${node.nodeName}/${sha1hex(
        (node as Element).outerHTML
      )}`;
    }
  }

  private elementToReactNode(
    element: Readonly<Element>,
    extraProps: Readonly<DynamicProps>
  ): React.ReactNode {
    const props = {} as DynamicProps;
    const children = [] as Array<React.ReactNode>;

    if (element.nodeName === "#comment") {
      return null;
    } else if (element.nodeName === "SCRIPT" || element.nodeName === "STYLE") {
      if (element.firstChild) {
        props.dangerouslySetInnerHTML = {
          __html: (element.firstChild as Text).data
        };
      }
    } else if (element.nodeName === "TEXTAREA") {
      if (element.firstChild) {
        props.defaultValue = (element.firstChild as Text).data;
      }
    } else {
      children.push(...this.nodesToReactNodes(element.childNodes));
    }

    return React.createElement(
      element.nodeName.toLowerCase(),
      { ...extractPropsFromElement(element), ...props, ...extraProps },
      ...children
    );
  }

  public nodeToReactNode(node: Node, props: DynamicProps): React.ReactNode {
    if (node.nodeName === "#text") {
      return (node as Text).data;
    } else {
      return this.elementToReactNode(node as Element, props);
    }
  }

  private nodesToReactNodes(nodes: ArrayLike<Node>): Array<React.ReactNode> {
    const reactNodes: Array<React.ReactNode> = [];
    for (let i = 0, len = nodes.length; i < len; i++) {
      const reactNode = this.replace(nodes[i], {
        key: this.digest(nodes[i], i)
      });
      reactNodes.push(reactNode);
    }
    return reactNodes;
  }

  public parseToNodeList(html: string): Array<React.ReactNode> {
    const doc = this.domParser.parseFromString("<body>" + html, "text/html");
    return this.nodesToReactNodes(doc.body.childNodes);
  }

  /**
   * @requires react v16.0.0 or later
   */
  public parseToFragment(html: string): React.ReactElement<DynamicProps> {
    console.assert(React.Fragment, "requires React v16 or later");
    return React.createElement(
      React.Fragment,
      {},
      ...this.parseToNodeList(html)
    );
  }
}
