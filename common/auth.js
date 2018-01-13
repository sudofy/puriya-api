let log = require(`tracer`).console({ format: `{{message}}  - {{file}}:{{line}}` }).log;
let passport = require(`passport`);
let Iron = require(`iron`);
let LocalStrategy = require(`passport-local`).Strategy;
let User = require(`../features/users/user.model`);
let config = require(`@config`);
let verify = require(`@common/verify`);
let Q = require(`q`);

//Setup Local Login Strategy
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getLoginData = function (user, expiry) {
  let userData = user._doc;
  delete userData.hash;
  delete userData.salt;
  delete userData.resetToken;
  delete userData.admin;

  let deferred = Q.defer();
  Iron.seal(userData, config.sealPass, Iron.defaults, function (err, sealed) {
    if (err) {
      deferred.reject(err);
    }
    log(sealed);
    log(err);
    let token = verify.getToken({ data: sealed }, expiry || `30 days`);
    let data = {
      token: token,
      user: userData
    };
    deferred.resolve(data);
  });


  return deferred.promise;
};