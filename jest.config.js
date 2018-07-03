const { defaults } = require('jest-config');

module.exports = {
  globals: {
    "ts-jest": {
      enableTsDiagnostics: true,
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
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
  moduleNameMapper: {
    "react-dom-shared/(.*)": "<rootDir>/build/react-dom-shared/$1",
    "shared/(.*)": "<rootDir>/build/shared/$1",
  },
};
