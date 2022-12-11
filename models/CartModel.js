const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const DB_URL = 'mongodb://127.0.0.1/online-shop'
const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number
});

const CartItem = mongoose.model('cart', cartSchema);

exports.addNewItem = (data) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            let item = new CartItem(data);
            return item.save();
        })
        .then(() => {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.getItemByUser = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.find({ userId: userId },{},{sort:{timestamp:1}})
        })
        .then((items) => {
            mongoose.disconnect();
            resolve(items);
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.editItem = (id,newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.updateOne({ _id: id }, newData)
        })
        .then((item) => {
            mongoose.disconnect();
            resolve(item);
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.deleteOne({ _id: id })//findByIdDelete(id)
        })
        .then((item) => {
            mongoose.disconnect();
            resolve(item);
        })
        .catch(err => {
            reject(err);
        })
    })
}

exports.getItemById = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => CartItem.findById(id))
            .then(item => {
                mongoose.disconnect();
                resolve(item);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

