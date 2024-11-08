const {User, UserType} = require('./schemas');

async function _getAllUsers() {
    const query = await User.find({});
    return query;
}

async function _getUsers(q = {}, pr = {}, opt = {}) {
    const query = await User.find(q, pr, opt);
    return query;
}

async function _getUserTypes(q = {}, pr = {}, opt = {}) {
    const query = await UserType.find(q, pr, opt);
    return query;
}


async function _addUser(username, password, fname, lname, email, phone, birthday, address) {

    const userType = await _getUserTypes({type: 'User'});

    try {
        const newUser = new User({
            username: username,
            password: password,
            type: userType[0]._id,
            fname: fname,
            lname: lname,
            email: email,
            phone: phone,
            birthday: birthday,
            address: address,
            join_date: new Date()
        });

        const savedUser = await newUser.save();
        return savedUser;

    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

async function _authenticateUser(username, password) {
    const query = await User.findOne({username: username, password: password});
    return query;
}

async function _findAndUpdateById(id, updateObj, opt = {}) {
    const query = await User.findByIdAndUpdate(id, updateObj, opt);
    return query;
}

async function _findAndDeleteById(id, opt = {}) {
    const query = await User.findByIdAndDelete(id, opt);
    return query;
}

module.exports = {
    getUsers: _getUsers,
    getAllUsers: _getAllUsers,
    addUser: _addUser,
    getUserTypes: _getUserTypes,
    authenticateUser: _authenticateUser,
    findAndUpdateById: _findAndUpdateById,
    findAndDeleteById: _findAndDeleteById
};
