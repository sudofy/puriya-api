/*global  merge:true*/
const defaultCfg = require(`./env/default`);
const env = process.env.NODE_ENV;
module.exports = env;
const config = defaultCfg;
module.exports = config;
const overrides = (env !== null && typeof env !== `undefined`) ? require(`./env/${env}`).config : null;
if (env !== null && typeof env !== `undefined`) {
  merge(config, overrides);
}
