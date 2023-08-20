const { Status } = require('./schemas');

async function _getStatuses(filter = {}, projection = {}, options = {}) {
    const statuses = await Status.find(filter, projection, options);
    return statuses;
}

module.exports = {
    getStatuses: _getStatuses
};
