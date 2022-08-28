const path = require("path");

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@functions": path.resolve(__dirname, "./e2e/integration/functions/"),
      "@fixtures": path.resolve(__dirname, "./e2e/fixtures/"),
      "@components": path.resolve(__dirname, "./components/"),
    },
  },
};
