import React from "react";
import { parseHtml } from "./parseHtml";
import { DynamicProps } from "./DynamicProps";
import { extractPropsFromElement } from "./extractPropsFromElement";

export interface ReactFromHtmlOptions {
  replace?(node: Node, props: object): React.ReactChild;
}

export class ReactFromHtml {
  readonly replace: (node: Node, props: DynamicProps) => React.ReactNode;

  constructor(options: ReactFromHtmlOptions = {}) {
    this.replace = options.replace || this.nodeToReactNode.bind(this);
  }

  private elementToReactNode(
    element: Readonly<Element>,
    extraProps: Readonly<DynamicProps>
  ): React.ReactNode {
    const props = {} as DynamicProps;
    const children = [] as Array<React.ReactNode>;

    if (element.nodeName === "SCRIPT" || element.nodeName === "STYLE") {
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
      const reactNode = this.replace(nodes[i], { key: i });
      reactNodes.push(reactNode);
    }
    return reactNodes;
  }

  public parseToNodeList(html: string): Array<React.ReactNode> {
    const nodeList = parseHtml(html);
    return this.nodesToReactNodes(nodeList);
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
