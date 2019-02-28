import { createContext } from "react";

export const DOMParserContext = createContext<DOMParser>({
  parseFromString: () => {
    throw new Error("You must setup <DOMParserContext.Provider/>");
  }
});
