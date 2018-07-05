import { DynamicProps } from "./DynamicProps";
import {
  RESERVED,
  BOOLEAN,
  NUMERIC,
  POSITIVE_NUMERIC,
  properties
} from "react-dom-shared/DOMProperty";
import { isUnitlessNumber } from "react-dom-shared/CSSProperty";

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

interface ReactStyleObject {
  [name: string]: any;
}

// the inverse of react-dom's hyphenateStyleName()
// e.g.
// convertToReactStyleName("background-color") = "backgroundColor"
// convertToReactStyleName("-moz-transition") = "MozTransition"
// convertToReactStyleName("-ms-transition") = "msTransition"
function convertToReactStyleName(name: string) {
  return name
    .replace(/^-ms\b/, "ms")
    .replace(/-(\w)/g, (_, firstChar: string) => {
      return firstChar.toUpperCase();
    });
}

function looksLikeNumber(value: string): boolean {
  const n = Number.parseFloat(value);
  return Number.isFinite(n);
}

function convertToReactStyleValue(name: string, value: string) {
  if (isUnitlessNumber[name] && looksLikeNumber(value)) {
    return Number.parseFloat(value);
  } else {
    return value;
  }
}

function convetCssomToReactStyleObject(
  style: CSSStyleDeclaration
): ReactStyleObject {
  const styleObject = {} as { [name: string]: any };
  for (let i = 0, len = style.length; i < len; i++) {
    const name = style[i];
    const value = style.getPropertyValue(name);
    const reactStyleName = convertToReactStyleName(name);
    styleObject[reactStyleName] = convertToReactStyleValue(
      reactStyleName,
      value
    );
  }
  return styleObject;
}

function convertAttrValueByType(
  value: string | null | undefined,
  type: number
): any {
  switch (type) {
    case BOOLEAN:
      return value != null;
    case NUMERIC:
    case POSITIVE_NUMERIC:
      return +(value || 0);
    default:
      return value;
  }
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
      // RESERVED includes style, dangerouslySetInnerHTML, innerHTML, defaultValue, and so on.
      if (record.propertyName === "style") {
        return {
          name,
          value: convetCssomToReactStyleObject(element["style"])
        };
      }
      return null; // ignores reserved prop name.
    } else {
      return {
        name: record.propertyName,
        value: convertAttrValueByType(attr.value, record.type)
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
