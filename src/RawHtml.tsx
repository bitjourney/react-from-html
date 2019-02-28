import React, { useMemo } from "react";
import { useDOMParser } from "./useDOMParser";
import { ReactFromHtml } from "./ReactFromHtml";

export interface Props {
  html: string;
}

export const RawHtml: React.FC<Props> = function(props) {
  const domParser = useDOMParser();

  const reactNode = useMemo(() => {
    const reactFromHtml = new ReactFromHtml({ domParser });
    return reactFromHtml.parseToFragment(props.html);
  }, [props.html]);

  return reactNode;
};
