import React from "react";

export class ReactFromHtml {

  constructor() {
  }

  parse(html: string): React.ReactElement<any> {
    return React.createElement("p", {}, "Hello!");
  }
}
