module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/out/**",
    "!**/extension/**",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/.github/**",
    "!**/.next/**",
    "!**/.vscode/**",
    "!**/public/**",
    "!**/extension/**",
    "!**/*.config.{js,jsx}",
    "!**/lcov-report/**",
  ],
  coverageThreshold: {
    global: {
      functions: 0,
      lines: 0,
      statements: -0,
    },
  },
  coverageDirectory: undefined,
};
