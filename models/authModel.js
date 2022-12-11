const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const DB_URL = 'mongodb://127.0.0.1/online-shop'
const userSchema =  mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: Number,
    Status: {
        type: String,
        default: 'Active'
    },
    preferredPaymentMethod: {
        type: String,
        default: 'Visa'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})
const User = mongoose.model('user', userSchema);

exports.createNewUser = (username, email, password, preferredPaymentMethod, phone) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({
                email: email
            }).then(user => {
                if (user) {
                    mongoose.disconnect();
                    reject("this email is used");
                } 
                else {
                    return bcrypt.hash(password, 10)
                }
            }).then(hashedPass=>{
                console.log(preferredPaymentMethod);
                let user = new User({
                    username: username,
                    email: email,
                    password: hashedPass,
                    preferredPaymentMethod: preferredPaymentMethod,
                    phone: phone
                })
                // console.log(user);
                return user.save();
            })
        }).then(() => {
            mongoose.disconnect();
            resolve()
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}

exports.login = (email, password) => {
    //check for email
    //no===>error
    //yes===>check for password
    //no===>error
    //yes===> set session
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({
                email: email
            })
        }).then((user) => {
            if (!user) {
                mongoose.disconnect();
                reject("There is no user matches this email");
            }
            else {
                bcrypt.compare(password,user.password).then((pass) => {
                    if (!pass) {
                        mongoose.disconnect();
                        reject("password is incorrect");
                    }
                    else {
                        mongoose.disconnect();
                        resolve({
                            id: user.email,
                            isAdmin: user.isAdmin
                        })
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })
}

exports.blockUser = (username1) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.deleteOne({ username:username1 })//findByIdDelete(id)
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

exports.ViewAccount = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: id })
        }).then((user) => {
            mongoose.disconnect();
            resolve(user)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    })
}
