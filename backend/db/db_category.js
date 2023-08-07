const {Category} = require('./schemas');

async function _getCategories(q = {}, opt = {}) {
    const query = Category.find(q, opt);
    return query;
}

module.exports = {
    getCategories: _getCategories
};
