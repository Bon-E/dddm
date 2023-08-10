const {Vendor} = require('./schemas');

async function _getVendors(q = {}, pr = {}, opt = {}) {
    const query = Vendor.find(q, pr, opt);
    return query;
}
module.exports = {
    getVendors: _getVendors
}
