
let mongoose = require(`mongoose`);

let Schema = mongoose.Schema;

let passportLocalMongoose = require(`passport-local-mongoose`);


let User = new Schema({

  username: String,
  password: String,
  OauthId: String,
  OauthToken: String,
  firstname: {
    type: String,
    default: ``
  },
  lastname: {
    type: String,
    default: ``
  },
  admin: {
    type: Boolean,
    default: false
  },
  resetToken: {
    type: String,
    default: ``
  }

}

);
User.plugin(passportLocalMongoose);

module.exports = mongoose.model(`user`, User);
