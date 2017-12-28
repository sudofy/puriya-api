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
        username: "faizan611",
        password: "12345",
      })
      .expect('status', 200)
      .done();

  });
});
describe("User Login :", () => {
  it("it should  fail to login the user with username missing", () => {
    frisby
      .post(config.domain + '/user/login', {
        password: "12345"
      })
      .expect('status', 401)
      .done();

  });
});
describe("User Login :", () => {
  it("it should  fail to login the user with password missing", () => {
    frisby
      .post(config.domain + '/user/login', {
        username: "faizan611"
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

describe("Verify the user  :", () => {
  it("it should verify the user", () => {
    frisby
      .get(config.domain + '/me', {
        "x-access-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiRmUyNi4yKipjNTlmYzI0ODU4MDk5NTIyNDg5ZTdjM2E3ZmE1ZmU4ZGJlNmE0NjkzZGNjYWMwYjNiNWM0OTA0ZjUxNTlkNmE0KllGRm5ZbXMwRW9MUENmMmZIRzY4ZmcqMHdPczlMV3hNMFk5eERQV2I4cTA2bXpRV2NxQlpSSGc0eG13YXUzWF9uWUxxY1ktdW9pN3oyV1plWWhuTU9GZVJGNVY5NkpvUU1PcUpuTVpzdjR2bkx4YW9yRlA2OVU5OXpoR0xteV9fVmZxMkl6VVpUXzU5TmxvRjFGdWFxWEF1S19FRWVuYXFFVVB3cWpkbU1jVGNBKipiZjkzYTNhM2ZhOTE0NjMxZWNiZDQzNTA5MzRmMzNiYzEwMDNhM2ZmOTU0NjAyZmYzMmVlNGVhNjU0NTBkYzgxKnNHSUx4ZHcwM3JBM25IQ1FHc3hlZUROaGRSWnM2VFNid0tSZmtYR2RlYk0iLCJpYXQiOjE1MTM5NDI0MzcsImV4cCI6MTUxNjUzNDQzN30.uEEC1VH8U8yFaKFLr_84In7nYIkQJKH4z01jxZY6Emg'

      })
      .expect('status', 200)
      .expect('json', {
        message: servermessage.user.SUCCESS_VERIFY
      })
      .done();

  });
});



