const esmImport = require('esm')(module);

const { postcssOpts } = esmImport('./opts.config.mjs');

module.exports = postcssOpts;
