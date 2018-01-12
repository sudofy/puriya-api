const defaultCfg = require('./env/default');
const env = process.env.NODE_ENV;
module.exports = env;
const config = { ...defaultCfg };
module.exports = config;
if (env !== undefined) {
    const overrides = require(`./env/${env}`).config;
    merge(config, overrides);
}