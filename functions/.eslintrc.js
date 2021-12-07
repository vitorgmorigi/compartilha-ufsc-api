module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "ignorePatterns": [
    "/lib/**/*", // Ignore built files.
  ],
  "rules": {
    "max-len": ["error", { "code": 120 }],
    "indent": ["error", 2],
    "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
    "comma-dangle": ["error", "only-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "newline-before-return": ["error"],
    "@typescript-eslint/type-annotation-spacing": ["error"],
    "eqeqeq": ["error"],
    "@typescript-eslint/ban-types": "off"
  },
};