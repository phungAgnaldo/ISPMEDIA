/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', 
  watchPathIgnorePatterns : [
    "node_modules"
  ],
  transformIgnorePatterns : [
    "node_modules"
  ]
};