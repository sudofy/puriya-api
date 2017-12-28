var config = require('@config');
var mongoose = require('mongoose');
module.exports = {
  domain: `http://localhost:3000/api`
}
const usermodel = require('../features/users/user.model');
beforeEach(function (done) {

  function clearDB() {
    var promises = [
      usermodel.remove().exec(),
    ];

    Promise.all(promises)
      .then(function () {
        done();
      })
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.mongoUrl, function (err) {
      if (err) {
        throw err;

      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});
