require('module-alias/register');
const config = require('./config.js');
const frisby = require('frisby');
const servermessage = require('@common/messages');

describe("User register :", () => {
  it("should save information of user", () => {

    frisby
      .post(config.domain + '/user/register', {

        username: "dany600",
        password: "12345",
        firstname: "faizan",
        lastname: "saeed",
      })
      .expect('status', 200)

      .done();

  });

});
describe("User Login :", () => {
  it("it should login the user", () => {
    frisby
      .post(config.domain + '/user/login', {
        username: "dany600",
        password: "12345",
      })
      .expect('status', 200)
      .done();

  });

  it("it should  fail to login the user with username missing", () => {
    frisby
      .post(config.domain + '/user/login', {
        password: "12345"
      })
      .expect('status', 401)
      .done();

  });

  it("it should  fail to login the user with password missing", () => {
    frisby
      .post(config.domain + '/user/login', {
        username: "dany600"
      })
      .expect('status', 401)
      .done();

  });
});
describe("User Logout :", () => {
  it("it should logout the user", () => {
    frisby
      .get(config.domain + '/user/logout', {

      })
      .expect('status', 200)
      .done();

  });
});
describe("Get all users :", () => {
  it("it should get all users", () => {
    frisby
      .get(config.domain + '/user/', {

      })
      .expect('status', 200)
      .done();

  });
});




