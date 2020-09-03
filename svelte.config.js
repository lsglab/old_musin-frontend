const esmImport = require('esm')(module);

const { preprocessOpts } = esmImport('./opts.config.mjs');

module.exports = preprocessOpts;
