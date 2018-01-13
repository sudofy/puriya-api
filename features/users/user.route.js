let express = require('express');

let router = express.Router();

let verify = require('@common/verify');

let userCtrl = require('./user.ctrl.js');

//GET users 
router.route(`/`)
  .get(userCtrl.listAll);


//Add user 
router.route(`/register`)
  .post(userCtrl.register);


//Login 
router.route(`/login`)
  .post(userCtrl.login);


//Logout 
router.route(`/logout`)
  .get(userCtrl.logout);


//Verify me 

router.route(`/me`)
  .get(verify.nocache, verify.user, verify.unseal, userCtrl.verifyUser);

module.exports = router;
