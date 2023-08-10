const {Platform} = require('./schemas');

async function _getPlatforms(q = {}, pr = {}, opt = {}) {
    const query = await Platform.find(q, pr, opt);
    return query;
}

module.exports = {
    getPlatforms: _getPlatforms
}
