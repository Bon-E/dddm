const {ObjectId, Decimal128} = require('mongodb');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const user_Schema = new Schema({
    username: String,
    password: String,
    type: ObjectId,
    fname: String,
    lname: String,
    email: String,
    phone: String,
    birthday: Date,
    address: {
        city: String,
        street: String,
        house_number: String
    },
    join_date: Date
}, {versionKey: false});

const user_types_Schema = new Schema({
    type: String
}, {versionKey: false});

const vendors_Schema = new Schema({
    name: String,
    website: String
}, {versionKey: false});

const categories_Schema = new Schema({
    name: String
}, {versionKey: false});

const statuses_Schema = new Schema({
    status: String
}, {versionKey: false});

const coupons_Schema = new Schema({
    end_date: Date,
    products: [
        {
            product_id: ObjectId,
            discount: Number
        }
    ]
}, {versionKey: false});

const orders_Schema = new Schema({
    user_id: ObjectId,
    date: Date,
    total_price: Number,
    status_id: ObjectId,
    order_items: [
        {
            product_id: ObjectId,
            quantity: Number,
            price_for_order: Number         
        }
    ]
}, {versionKey: false});

const platforms_Schema = new Schema({
    name: String
}, {versionKey: false});

const products_Schema = new Schema({
    name: String,
    description: String,
    category_id: ObjectId,
    platform_id: ObjectId,
    vendor_id: ObjectId,
    stock: Number,
    image: String,
    pricing: [
        {
            _id: false,
            price: Number,
            changed_on: Date,
            changed_by: ObjectId
        }
    ]
}, {versionKey: false});

const wishlists_Schema = new Schema({
    user_id: ObjectId,
    product_id: ObjectId
}, {versionKey: false});

const WishList = mongoose.model('WishList', wishlists_Schema, 'wishlist');
const Product = mongoose.model('Product', products_Schema, 'products');
const Platform = mongoose.model('Platform', platforms_Schema, 'platforms');
const Order = mongoose.model('Order', orders_Schema, 'orders');
const Coupon = mongoose.model('Coupon', coupons_Schema, 'coupons');
const Status = mongoose.model('Status', statuses_Schema, 'statuses');
const Category = mongoose.model('Category', categories_Schema, 'categories');
const Vendor = mongoose.model('Vendor', vendors_Schema, 'vendors');
const UserType = mongoose.model('UserType', user_types_Schema, 'user_types');
const User = mongoose.model('users', user_Schema);

module.exports.User = User;
module.exports.Product = Product;
module.exports.Platform = Platform;
module.exports.Order = Order;
module.exports.Coupon = Coupon;
module.exports.Status = Status;
module.exports.UserType = UserType;
module.exports.WishList = WishList;
module.exports.Vendor = Vendor;
module.exports.Category = Category;
