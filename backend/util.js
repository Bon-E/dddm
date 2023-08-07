const db_user = require('./db/db_user');

async function _isAdmin(user) {
    if (user == undefined) {
        return false;
    }
    const userType = await db_user.getUserTypes({type: 'Admin'});
    return user.type == userType[0]._id;
}

async function _isLogged(user) {
    return user != undefined && user != null;
}

module.exports = {
    isAdmin: _isAdmin,
    isLogged: _isLogged
}
