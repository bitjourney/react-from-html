export const ReactFromHtml: import("../src").ReactFromHtml = (() => {
  if (process.env.TEST_DIST) {
    return require("..").ReactFromHtml;
  } else {
    return require("../src").ReactFromHtml;
  }
})();
