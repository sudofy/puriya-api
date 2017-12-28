var express = require('express');

var router = express.Router();

var log = require('@common/log');

var verify = require('@common/verify');

var userCtrl = require('./user.ctrl.js');



//GET users 
router.route('/')
  .get(userCtrl.listAll);


//Add user 
router.route('/register')
  .post(userCtrl.register);


//Login 
router.route('/login')
  .post(userCtrl.login);


//Logout 
router.route('/logout')
  .get(userCtrl.logout);


//Verify me 

router.route('/me')
  .get(verify.nocache, verify.user, verify.unseal, userCtrl.verifyUser);

module.exports = router;
