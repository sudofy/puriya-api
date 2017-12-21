   var express = require('express');

                var log = require('tracer').console({format : "{{message}}  - {{file}}:{{line}}"}).log;

                var verify = require('../server/verify');

                // default user route Import
                var user = require('../features/users/user.route');

                //----API---import

                
                
                module.exports = function (app, config, models) {

                  var router = express.Router();

                
                  
                
                
                //default user route
                  router.use('/user', user);
                  //----API----Routes   

                  app.use('/api', router);

                };

              