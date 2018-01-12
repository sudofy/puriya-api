
const usermodel = require('../features/users/user.model');



function clearDB() {

    usermodel.remove().exec()

}

clearDB();