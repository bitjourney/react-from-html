import "./setup";

import { ReactFromHtml } from "src";
import ReactDOM from "react-dom";
import { JSDOM } from "jsdom";

const reactFromHtml = new ReactFromHtml();

const { window } = new JSDOM("<html/>");

Object.assign(global, window);

const container = window.document.createElement("div");

ReactDOM.render(
  reactFromHtml.parseToFragment(
    `
    <p style='color: red; font-size: 20px'>Hello, world!</p>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="60" height="60">
      <rect width="60" height="60"/>
      <text text-anchor="middle" alignment-baseline="central" x="30" y="30" style="font-size: 15;fill: #327ac2;">Hello, world!</text>
    </svg>
    `
  ),
  container
);

console.log(container.innerHTML);
