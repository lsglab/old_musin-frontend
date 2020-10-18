const esmImport = require('esm')(module);

const { preprocessConfig } = esmImport('./opts.config.js');

const dev = process.env.NODE_ENV === 'development';

module.exports = preprocessConfig(dev);
