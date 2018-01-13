let config = require(`@config`);
let mongoose = require(`mongoose`);
let log = require(`tracer`).console({ format: `{{message}}  - {{file}}:{{line}}` }).log;

exports.connect = function () {
  mongoose.connect(config.mongoUrl);
  let db = mongoose.connection;
  db.on(`error`, console.error.bind(console, `connection error:`));
  db.once(`open`, function () {
    // we`re connected!
    log(`MongoDB connected on "  ${config.mongoUrl}`);
    log(`###########################################################################`);
  });
};

