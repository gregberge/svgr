module.exports = {
  watchPathIgnorePatterns: ['__fixtures__', '__fixtures__build__'],
  rootDir: 'packages',
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
}
