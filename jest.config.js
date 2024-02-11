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
      functions: 50,
      lines: 50,
      statements: -50,
    },
  },
  coverageDirectory: undefined,
};
