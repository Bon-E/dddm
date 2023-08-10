const {Category} = require('./schemas');

async function _getCategories(q = {}, pr = {}, opt = {}) {
    const query = Category.find(q, pr, opt);
    return query;
}

module.exports = {
    getCategories: _getCategories
};
