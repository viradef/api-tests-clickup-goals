require('dotenv').config();
const { defineConfig } = require("cypress");
//const {allureCypress} = require("allure-cypress/reporter");
//const {platform, release, version} = require("node:os");

module.exports = defineConfig({
  reporter: 'mochawesome',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    url: process.env.CYPRESS_url,
    clickupToken: process.env.CYPRESS_clickupToken,
    teamId: process.env.CYPRESS_teamId
  }
});