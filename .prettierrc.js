/** @type {import("prettier").Options} */
const config = {
  trailingComma: "all",
  tabWidth: 2,
  semi: false,
  printWidth: 120,
  plugins: ["prettier-plugin-solidity"],
  overrides: [
    {
      files: "*.sol",
      options: {
        parser: "solidity-parse",
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: true,
      },
    },
  ],
}

module.exports = config
