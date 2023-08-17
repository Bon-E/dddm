const db_user = require("./db/db_user");

async function _isAdmin(user) {
    if (user == undefined) {
        return false;
    }
    const userType = await db_user.getUserTypes({ type: "Admin" });
    return user.type == userType[0]._id;
}

async function _isLogged(user) {
    return user != undefined && user != null;
}

function _findCurrentPrice(product) {
    let prices = product.pricing;
    let lastDate = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (new Date(prices[i].changed_on) > new Date(lastDate.changed_on)) {
            lastDate = prices[i];
        }
    }
    return lastDate.price;
}

module.exports = {
    findCurrentPrice: _findCurrentPrice,
    isAdmin: _isAdmin,
    isLogged: _isLogged
};
