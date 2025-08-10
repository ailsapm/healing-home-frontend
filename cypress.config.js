const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',  //React frontend URL
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
