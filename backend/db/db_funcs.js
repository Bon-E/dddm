const mongoose = require('mongoose');
const {
    User,
    Product,
    Platform,
    Order,
    Coupon,
    Status,
    UserType,
    WishList,
    Vendor,
    Category
} = require('./schemas');
const {ObjectId} = require('mongodb');

async function _getAllUsers() {
    const query = await User.find({});
    return query;
}

async function _getUserTypes(q = {}, opt = {}) {
    const query = await UserType.find(q, opt);
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

async function addVendor(name,website){
    try{
        const newVendor = new Vendor({
            name: name,
            website: website,
        });
        console.log(newVendor);
        const savedVendor = await newVendor.save();
        console.log('Vendor registered successfully:', savedVendor);
        return savedVendor;
    } catch (error){
        console.error('Error registering Vendor:', error);
        throw error;
    }
}

async function deleteVendor(name, site) {
    try {
      const deletedVendor = await Vendor.findOneAndDelete({ name, website: site });
      console.log('Vendor deleted successfully:', deletedVendor);
      return deletedVendor;
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw error;
    }
  }

  async function editVendor(id, name, website) {
    try {
      const updatedVendor = await Vendor.findByIdAndUpdate(
        id,
        { name, website },
        { new: true }
      );
      console.log('Vendor updated successfully:', updatedVendor);
      return updatedVendor;
    } catch (error) {
      console.error('Error updating vendor:', error);
      throw error;
    }
  }

module.exports = {
    getAllUsers: _getAllUsers,
    addVendor: addVendor,
    deleteVendor: deleteVendor,
    addUser: _addUser,
    getUserTypes: _getUserTypes
};
