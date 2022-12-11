const mongoose = require('mongoose')
const DB_URL = 'mongodb://127.0.0.1/online-shop'
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    category: String
})
const Product = mongoose.model('product', productSchema)
exports.getAllProducts = () => {
    //connect to dp
    //get products
    //disconnect
    // return new Promise((resolve, reject)=> {
    //     mongoose.connect(DB_URL).then(() => {
    //         return Product.find().then((products) => {
    //             mongoose.disconnect();
    //             resolve(products)
    //         })
    //     }).catch(err => reject(err))
    // })

    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({})
            }).then((products) => {
                mongoose.disconnect();
                resolve(products)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}
exports.getProductByCategory = (category) => {
    return new Promise((resolve, reject)=> {
        mongoose.connect(DB_URL).then(() => {
            return Product.find({category:category})
            }).then((product) => {
                mongoose.disconnect();
                resolve(product)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        //findById
        mongoose.connect(DB_URL).then(() => {
            /*if (id.match(/^[0-9a-fA-F]{24}$/)===0) {
                
            }*/
            return Product.findById(id)
        }).then((products) => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.getFirstProduct = () => {
    return new Promise((resolve, reject) => {
        //findById
        mongoose.connect(DB_URL).then(() => {
            /*if (id.match(/^[0-9a-fA-F]{24}$/)===0) {
                
            }*/
            return Product.findOne({})
        }).then((products) => {
            mongoose.disconnect();
            resolve(products)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.getProductByName = (name1) => {
    return new Promise((resolve, reject) => {
        //findById
        mongoose.connect(DB_URL).then(() => {
            /*if (id.match(/^[0-9a-fA-F]{24}$/)===0) {
                
            }*/
            return Product.find({name:name1})
        }).then((product) => {
            mongoose.disconnect();
            resolve(product)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}


exports.addNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let newProduct = new Product(data);
                return newProduct.save();
            })
            .then(products => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return Product.deleteOne({ _id: id })//findByIdDelete(id)
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