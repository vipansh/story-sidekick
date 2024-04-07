module.exports = {
  endOfLine: "lf",
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: ["^components/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
