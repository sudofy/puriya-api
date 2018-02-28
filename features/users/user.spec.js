require('module-alias/register');
const config = require('../../spec/config');
const frisby = require('frisby');
const Joi = frisby.Joi;

describe(`User register :`, () => {
  it(`should save information of user`, () => {
    frisby
      .post(`${config.domain}/user/register`, {
        username: `dany600`,
        password: `12345`,
        firstname: `faizan`,
        lastname: `saeed`,
      })
      .expect(`status`, 200)
      .expect(`json`, `errors`, {
        message: `User registered Successfully`,
      })
      .done();
  });

});
describe(`User Login :`, () => {
  it(`it should login the user`, () => {
    frisby
      .post(`${config.domain}/user/login`, {
        username: `dany600`,
        password: `12345`,
      })
      .expect(`status`, 200)
      .expect(`json`, {

        message: `Login successful!`,
        success: true,
        data: {
          token: Joi.string(),
          user: {
            firstname: Joi.string(),
            lastname: Joi.string(),
            __v: 0,
            username: `dany600`,
            _id: Joi.string()
          }
        }
      })

      .done();

  });

  it(`it should  fail to login the user with username missing`, () => {
    frisby
      .post(`${config.domain}/user/login`, {
        password: `12345`
      })
      .expect(`status`, 500)
      .done();

  });

  it(`it should  fail to login the user with password missing`, () => {
    frisby
      .post(`${config.domain}/user/login`, {
        username: `dany600`
      })
      .expect(`status`, 500)
      .done();

  });
});
describe(`User Logout :`, () => {
  it(`it should logout the user`, () => {
    frisby
      .get(`${config.domain}/user/logout`, {

      })
      .expect(`status`, 200)
      .done();

  });
});
describe(`Get all users :`, () => {
  it(`it should fail to get all users`, () => {
    frisby
      .get(`${config.domain}/user/`, {

      })
      .expect(`status`, 403)
      .expect(`json`, {
        message: `No token provided!`,
        success: false
      })
      .done();

  });
});
