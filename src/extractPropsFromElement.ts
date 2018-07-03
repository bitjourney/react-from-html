import { DynamicProps } from "./DynamicProps";
import { RESERVED, properties } from "react-dom-shared/DOMProperty";

interface PropertyInfoRecord {
  type: number;
  acceptsBooleans: boolean;
  attributeName: string;
  propertyName: string;
}

const ATTR_MAP: ReadonlyMap<string, PropertyInfoRecord> = (() => {
  const map = new Map<string, PropertyInfoRecord>();

  const records = Object.values(properties) as Array<PropertyInfoRecord>;
  for (const record of records) {
    map.set(record.attributeName, record);
  }

  return map;
})();

interface Prop {
  name: string;
  value: any;
}

function toReactStyleName(name: string) {
  return name.replace(/-(\w)/, (_, firstChar: string) => {
    return firstChar.toUpperCase();
  });
}

function parseStyle(style: CSSStyleDeclaration): { [name: string]: any } {
  const styleObject = {} as { [name: string]: any };
  for (let i = 0, len = style.length; i < len; i++) {
    const name = style[i];
    styleObject[toReactStyleName(name)] = style.getPropertyValue(name);
  }
  console.log(style);
  return styleObject;
}

function attrToProp(element: Element, attr: Attr): Prop | null {
  const name = attr.name;

  if (name === "value") {
    if (element.nodeName === "INPUT" || element.nodeName === "SELECT") {
      return {
        name: "defaultValue",
        value: attr.value
      };
    }
  }

  const record = ATTR_MAP.get(name);
  if (record) {
    if (record.type === RESERVED) {
      if (record.propertyName === "style") {
        return {
          name,
          value: parseStyle(element["style"])
        };
      }
      return null; // ignore reserved prop name, e.g.dangerouslySetInnerHTML
    } else {
      return {
        name: record.propertyName,
        value: attr.value
      };
    }
  } else {
    return {
      name,
      value: attr.value
    };
  }
}

export function extractPropsFromElement(
  element: Element
): Readonly<DynamicProps> {
  const attributes = element.attributes;
  const props = {} as DynamicProps;
  for (let i = 0, len = attributes.length; i < len; i++) {
    const prop = attrToProp(element, attributes[i]);
    if (prop) {
      props[prop.name] = prop.value;
    }
  }
  return props;
}
