const {Vendor} = require('./schemas');

async function _getVendors(q = {}, opt = {}) {
    const query = Vendor.find(q, opt);
    return query;
}

const getAllVendors = async () => {
        const vendors = await Vendor.find();
        return vendors;
};

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

async function deleteVendor(vendorID) {
    try {
        console.log(vendorID,'HALO');
      const deletedVendor = await Vendor.findByIdAndDelete(vendorID);
      console.log('Vendor deleted successfully:', deletedVendor);
      return deletedVendor;
    } catch (error) {
      console.error('Error deleting vendor:', error);
      throw error;
    }
  }

  async function editVendor(name,website,vendorID){
    const updateVendor = await Vendor.findById(vendorID);
    updateVendor.name = name;
    console.log(website);
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