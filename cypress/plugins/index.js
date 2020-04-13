/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile (file) {
    const pathToConfigFile = path.resolve( 'cypress', 'config', `${file}.json`);

    return fs.readJson(pathToConfigFile)
}

module.exports = (on, config) => {
    // accept a configFile value or use local by default
    const file = config.env.configFile || 'local';

    return getConfigurationByFile(file)
};

module.exports = (on, config) => {
    // logging on failed commands
    on('task', {
        failed: require('cypress-failed-log/src/failed')(),
    })
};