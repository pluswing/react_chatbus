module.exports = {
  extends: [
    "react-app",
    "plugin:react/recommended",
    "standard",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error"
  }
};
