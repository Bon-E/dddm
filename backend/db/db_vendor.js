const {Vendor} = require('./schemas');

async function _getVendors(q = {}, opt = {}) {
    const query = Vendor.find(q, opt);
    return query;
}
module.exports = {
    getVendors: _getVendors
}
