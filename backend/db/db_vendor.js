const { Vendor } = require('./schemas');

async function _getVendors(q = {}, pr = {}, opt = {}) {
    const query = Vendor.find(q, pr, opt);
    return query;
}

const getAllVendors = async () => {
    const vendors = await Vendor.find();
    return vendors;
};

async function addVendor(name, website) {
    try {
        const newVendor = new Vendor({
            name: name,
            website: website
        });
        const savedVendor = await newVendor.save();
        return savedVendor;
    } catch (error) {
        console.error('Error registering Vendor:', error);
        throw error;
    }
}

async function deleteVendor(vendorID) {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(vendorID);
        return deletedVendor;
    } catch (error) {
        console.error('Error deleting vendor:', error);
        throw error;
    }
}

async function editVendor(name, website, vendorID) {
    const updateVendor = await Vendor.findById(vendorID);
    updateVendor.name = name;
    updateVendor.website = website;
    updateVendor.save();
    return updateVendor;
}

module.exports = {
    getVendors: _getVendors,
    addVendor: addVendor,
    deleteVendor: deleteVendor,
    editVendor: editVendor,
    getAllVendors: getAllVendors
};
