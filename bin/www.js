#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('module-alias/register');
let app = require('../main');
let debug = require('debug')('api:server');
let http = require('http');
let log = require('@common/log');
let art = require('ascii-art');
let serverMessages = require('@common/messages');
let serverCodes = require('@common/codes');
/**
 * Get port from environment and store in Express.
 */
function normalizePort(val) {
  let portnum = parseInt(val, 10);

  if (isNaN(portnum)) {
    // named pipe
    return val;
  }

  if (portnum >= 0) {
    // port number
    return portnum;
  }

  return false;
}
let port = normalizePort(process.env.PORT || `3000`);
app.set(`port`, port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */



/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === `string`
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on  ${bind}`);

  art.font(`PURIYA-API`, `Doom`, function (rendered) {
    log(rendered);
  });

  log(`Server Running on port  ${app.get(`port`)}`);
  log(`###########################################################################`);
}
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== `listen`) {
    throw error;
  }

  let bind = typeof port === `string`
    ? `Pipe ${port}`
    : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case `EACCES`:
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case `EADDRINUSE`:
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
server.listen(port);
server.on(`error`, onError);
server.on(`listening`, onListening);

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
if (app.get(`env`) === `development`) {
  app.use(function (err, req, res) {
    log(`##API--ERR`);
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
app.use(function (err, req, res) {
  log(`##API--ERR`);
  log(err);
  res.status(err.status || serverCodes.SERVER_ERROR);
  res.json({
    message: err.message,
    data: null,
    success: false
  });
});

// process.on(`uncaughtException`, function (err) {
//   log(`Caught exception: ` + err);
// });




