"use strict";

if (process.env.NODE_ENV === 'production') {
  module.exports = require("./dist/react-from-html.production.js");
} else {
  module.exports = require("./dist/react-from-html.development.js");
}
