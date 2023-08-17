const { Product } = require("./schemas");

async function _addProduct(name, description, category_id, platform_id, vendor_id, stock, image, price, changed_by) {
    try {
        const newProduct = new Product({
            name: name,
            description: description,
            category_id: category_id,
            platform_id: platform_id,
            vendor_id: vendor_id,
            stock: stock,
            image: image,
            pricing: [
                {
                    price: price,
                    changed_on: new Date(),
                    changed_by: changed_by
                }
            ]
        });
        // console.log(newProduct);
        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (error) {
        console.log("Couldn't add product: ", error);
        throw error;
    }
}

async function _getProducts(q = {}, pr = {}, opt = {}) {
    const query = await Product.find(q, pr, opt);
    return query;
}

async function _getProduct(id) {
    const query = await Product.findOne({ _id: id });
    return query;
}

async function _findAndDeleteById(id) {
    const query = await Product.findByIdAndDelete(id);
    return query;
}

module.exports = {
    getProduct: _getProduct,
    getProducts: _getProducts,
    addProduct: _addProduct,
    findAndDeleteById: _findAndDeleteById
};
