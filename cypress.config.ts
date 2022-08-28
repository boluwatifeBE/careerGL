import { defineConfig } from "cypress";
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

export default defineConfig({
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  video: false,
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "./e2e/**/tests/**",
    supportFile: "./e2e/support/e2e.ts",
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        all({ baseUrl, urls }) {
          const promises = urls.map((url) =>
            axios
              .get(`${baseUrl}${url}`)
              .then(function (response) {
                const { status, data } = response;
                return { status, url, data };
              })
              .catch(({ response: { status }, message }) => {
                return { status, url, data: message };
              })
          );
          return Promise.all(promises);
        },
      });
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


