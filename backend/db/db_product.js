const { Product } = require('./schemas');

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

        const savedProduct = await newProduct.save();
        return savedProduct;
    } catch (error) {
        console.error("Couldn't add product: ", error);
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

async function _updateProductStock(productId, quantity) {
    const product = await Product.findById(productId);
    if (product) {
        product.stock -= quantity;
        await product.save();
    }
}

async function _updateProductStockMass(items) {
    let ok = true;

    for (const item of items) {
        try {
            await _updateProductStock(item.product_id, item.quantity);
        } catch {
            ok = false;
            break;
        }
    }
    return ok;
}

module.exports = {
    getProduct: _getProduct,
    getProducts: _getProducts,
    addProduct: _addProduct,
    findAndDeleteById: _findAndDeleteById,
    updateProductStock: _updateProductStock,
    updateProductStockMass: _updateProductStockMass
};
