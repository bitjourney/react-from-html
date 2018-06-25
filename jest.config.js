const { defaults } = require('jest-config');

module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, "/vendor/"],
  testRegex: "\\.test\\.tsx?$",
};
