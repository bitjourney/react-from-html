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
    "react-dom-shared/(.*)": "<rootDir>/vendor-build/react-dom-shared/$1",
    "shared/(.*)": "<rootDir>/vendor-build/shared/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
  ],
};
