const passport = require('passport');
const log = require('@common/log');
const auth = require('@common/auth');
const serverCodes = require('@common/codes');
const serverMessages = require('@common/messages');
const userData = require('./user.db');
const Boom = require('Boom');
exports.listAll = async function (req, res, next) {
  const params = { ...req };
  await userData.findAllUser(params).then(users => {
    if (users.length === 0) {
      return next({
        message: serverMessages.user.ERROR_NO_USER,
        data: {}
      });
    }
    return res.json({
      message: serverMessages.user.SUCCESS_FOUND,
      success: true,
      data: users
    });
  }).catch(err => {
    if (err) {
      throw Boom.badImplementation(`DB error`);
    }
  });
};

exports.register = async function (req, res) {
  const params = { ...req };
  await userData.registerUser(params).then(() => {
    passport.authenticate(`local`)(req, res, function () {
      return res.json({
        message: serverMessages.user.SUCCESS_REGISTER,
        success: true,
        data: null
      });
    });
  }).catch(err => {
    if (err) {
      throw Boom.badRequest(`DB error`);
    }
  });
};

exports.login = function (req, res, next) {

  passport.authenticate(`local`, function (err, user, info) {
    log(err, user, info);
    if (err) {
      return next({
        message: serverMessages.generic.DB_ERROR,
        data: err
      });
    }
    if (info) {
      return next({
        status: serverCodes.AUTH_ERROR,
        message: info.message,
        data: err
      });
    }
    if (!user) {
      return next({
        message: serverMessages.user.ERROR_NO_USER,
        data: null
      });
    }

    req.logIn(user, function (err) {
      log(err);

      if (err) {

        return next({
          message: serverMessages.user.ERROR_CAN_NOT_LOGIN,
          data: err
        });
      }

      auth.getLoginData(user).then(function (data) {

        return res.json({
          message: serverMessages.user.SUCCESS_LOGIN,
          success: true,
          data: data
        });
      }, function (err) {
        return next({
          message: serverMessages.user.ERROR_LOGIN,
          data: err
        });

      }).catch(err => {
        log(err);
      });

    });
  })(req, res, next);
};

exports.verifyUser = async function (req, res) {
  const param = { ...req };
  await userData.verifyUser(param).then(user => {
    if (!user) {
      Boom.badImplementation('No user');
    }
    auth.getLoginData(user).then(function (data) {
      return res.json({
        message: serverMessages.user.SUCCESS_VERIFY,
        success: true,
        data: data
      });
    }).catch(err => {
      if (err) {
        Boom.badImplementation('Error get user data');
      }
    });
  });
};

exports.logout = function (req, res) {
  userData.logoutUser();
  res.json({
    message: serverMessages.user.SUCCESS_LOGOUT,
    success: true,
    data: null
  });
};
