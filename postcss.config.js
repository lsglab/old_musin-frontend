const esmImport = require('esm')(module);

const { postcssConfig } = esmImport('./opts.config.mjs');

const dev = process.env.NODE_ENV === 'development';

module.exports = postcssConfig(dev);
