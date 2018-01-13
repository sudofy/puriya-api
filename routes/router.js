let express = require('express');
// default user route Import
let user = require('../features/users/user.route');





module.exports = function (app) {

  let router = express.Router();





  //default user route
  router.use(`/user`, user);

  app.use(`/api`, router);

};

