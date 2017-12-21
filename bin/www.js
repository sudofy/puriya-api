#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('module-alias/register');
var app = require('../main');
var debug = require('debug')('api:server');
var http = require('http');
var log = require('log');
var art = require('ascii-art');
var serverMessages = require('../server/messages');
var serverCodes = require('../server/codes');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//Requiring routes
require('../routes/router')(app);
/**
 * Normalize a port into a number, string, or false.
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next({
    status: 404,
    message: serverMessages.server.ROUTE_NOT_FOUND,
    data: null
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    log('##API--ERR');
    log(err);
    res.status(err.status || serverCodes.SERVER_ERROR);
    res.json({
      message: err.message,
      data: err.data,
      success: false
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  log('##API--ERR');
  log(err);
  res.status(err.status || serverCodes.SERVER_ERROR);
  res.json({
    message: err.message,
    data: null,
    success: false
  });
});
process.on('uncaughtException', function (err) {
  log('Caught exception: ' + err);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);

  art.font('base-codeapi    server', 'Doom', function (rendered) {
    console.log(rendered);
  });

  log("Server Running on port " + app.get('port'));
  log("###########################################################################");
}
