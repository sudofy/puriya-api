var winston = require('winston');
require('winston-papertrail').Papertrail;
//var log = require('./puriya');
var log = require('tracer').console({ format: "{{message}}  - {{file}}:{{line}}" }).log;
var host = 'logs6.papertrailapp.com';
var port = 29324;

var nodeWinstonPapertrail = new winston.transports.Papertrail({
  host: host,
  port: port,
  program: 'API',
  colorize: true,
  logFormat: function (level, message) {
    return message;
  }
});


var nodeLogger = new winston.Logger({
  transports: [nodeWinstonPapertrail]
});


function productionLogs() {
  var fileParts;
  var fileName = ' - ';
  try {
    fileParts = new Error().stack.split('\n')[2].split('/');
    fileName = ' - ' + fileParts[fileParts.length - 1]
  }
  catch (err) { }
  nodeLogger.info(...arguments, fileName)
}


//PRODUNCTION LOGS
if (process.env.ENVIRONMENT == 'aws') {
  module.exports = productionLogs;
}
//DEV LOGS
else {
  module.exports = log
}