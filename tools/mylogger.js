const log4js = require('log4js');
const log_conf = require("../config/log");
const logger = log4js.getLogger(log_conf.tag);

log4js.configure(log_conf);
logger.level = log_conf.level;


module.exports = logger;
