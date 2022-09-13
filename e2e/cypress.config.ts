import { defineConfig } from "cypress";
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

export default defineConfig({
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "**/tests/**",
    supportFile: "cypress/support/index.ts",
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        webpackPreprocessor({
          webpackOptions: require("./webpack.config"),
          watchOptions: {},
        })
      );
    },
  },
});
