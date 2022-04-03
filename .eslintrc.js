module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        // pathGroups: [
        //   {
        //     pattern: "@alias/**",
        //     group: "parent",
        //     position: "before",
        //   },
        // ],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
        "@typescript-eslint/explicit-function-return-type": "warn",
        quotes: ["error", "double"],
        "import/no-unresolved": 0,
      },
    ],
  },
};
