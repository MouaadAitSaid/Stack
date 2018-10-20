// requires
const _ = require('lodash');
const _u = require("../Services/Utilities")
// module variables
const config = require('./Config.json');
const defaultConfig = config.dev;
const environment = process.env.NODE_ENV || 'dev';
const environmentConfig = config[environment];
const finalConfig = _.merge(defaultConfig, environmentConfig);

// as a best practice
// all global variables should be referenced via global. syntax
// and their names should always begin with g
global.gConfig = finalConfig;

// log global.gConfig
_u.console('i',false,`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);
