module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  globals: {
    process: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: "off",
    "@typescript-eslint/quotes": ["error", "single", { avoidEscape: true }],
    semi: "off",
    "@typescript-eslint/semi": ["error", "never"],
    "linebreak-style": "off",
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": ["error"],
    "react/prop-types": "off",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "trace", "log"],
      },
    ],
  },
};
