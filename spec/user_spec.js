const config = require('./config.js');
const frisby = require('frisby');
describe("User register :", () => {
    it("should save information of user", () => {
        frisby
            .post(config.domain + '/register', {
                username: "faizan611",
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
            .post(config.domain + '/login', {
                username: "faizan611",
                password: "12345",
            })
            .expect('status', 200)
            .done();

    });
});
describe("User Logout :", () => {
    it("it should logout the user", () => {
        frisby
            .get(config.domain + '/logout', {

            })
            .expect('status', 200)
            .done();

    });
});
describe("Get all cllients :", () => {
    it("it should logout the user", () => {
        frisby
            .get(config.domain + '/', {

            })
            .expect('status', 200)
            .done();

    });
});


