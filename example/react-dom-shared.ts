import "./setup";
import * as DOMProperty from "react-dom-shared/DOMProperty";

console.log(DOMProperty.properties);
console.log("---------");
console.log(DOMProperty.getPropertyInfo("style"));
console.log(DOMProperty.getPropertyInfo("dangerouslySetInnerHTML"));
console.log(DOMProperty.getPropertyInfo("acceptCharset"));
