const {Platform} = require('./schemas');

async function _getPlatforms(q = {}, opt = {}) {
    const query = await Platform.find(q, opt);
    return query;
}

module.exports = {
    getPlatforms: _getPlatforms
}
