
import { ReactFromHtml } from "../src";
import ReactDOM from "react-dom";
import { JSDOM } from "jsdom";

const reactFromHtml = new ReactFromHtml();

const { window } = new JSDOM('<html/>');
const container = window.document.createElement('div');

ReactDOM.render(reactFromHtml.parse("<p>Hello, world!>"), container);

console.log(container.innerHTML);
