import { DynamicProps } from "./DynamicProps";

function attrNameToPropName(element: Element, name: string): string {
  if (name === "value") {
    if (element.nodeName === "INPUT" || element.nodeName === "SELECT") {
      return "defaultValue";
    }
  }
  return name;
}

function attrValueToPropValue(element: Element, value: any): any {
  return value;
}

export function extractPropsFromElement(
  element: Element
): Readonly<DynamicProps> {
  const attributes = element.attributes;
  const props = {} as DynamicProps;
  for (let i = 0, len = attributes.length; i < len; i++) {
    const propName = attrNameToPropName(element, attributes[i].name);
    const propValue = attrValueToPropValue(element, attributes[i].value);
    props[propName] = propValue;
  }
  return props;
}
