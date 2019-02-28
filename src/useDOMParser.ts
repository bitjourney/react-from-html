import { useContext } from "react";
import { DOMParserContext } from "./DOMParserContext";

export function useDOMParser() {
  return useContext(DOMParserContext);
}
