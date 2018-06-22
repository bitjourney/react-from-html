export function parseHtml(html: string): NodeList {
  const fragment = document.createElement("div");
  fragment.innerHTML = html;
  return fragment.childNodes;
}
