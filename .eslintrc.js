module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react", "jsx-a11y"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    sourceType: "module"
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    "no-console": 0,
    "no-unused-vars": 1
  }
}
