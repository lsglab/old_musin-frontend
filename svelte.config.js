const esmImport = require('esm')(module);

const { preprocessConfig } = esmImport('./opts.config.mjs');

module.exports = preprocessConfig(true);
