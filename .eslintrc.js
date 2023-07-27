module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "react-native"],
  ignorePatterns: ["node_modules/", "build/", "dist/", ".eslintrc.js"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "warn",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/naming-convention": "warn",
    "@typescript-eslint/await-thenable": "warn",
  },
};
