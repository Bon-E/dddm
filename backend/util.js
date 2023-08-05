const db_user = require('./db/db_user');

async function _isAdmin(user) {
    if (user == undefined) {
        return false;
    }

    const userType = await db_user.getUserTypes({type: 'Admin'});
    console.log('NOW ', user.type == userType[0]._id)
    console.log(user.type, userType[0]._id);
    return user.type == userType[0]._id;
}

module.exports = {
    isAdmin: _isAdmin
}
