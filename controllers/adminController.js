const { validationResult } = require("express-validator");
const productsModel = require("../models/productsModel");
const ordersModel = require("../models/OrderModel");
const authModel = require("../models/authModel");

exports.getAdd = (req, res, next) => {
    res.render("add-product", {
        validationErrors: req.flash("validationErrors"),
        isUser: false,
        isAdmin: true,
        productAdded: req.flash("added")[0],
    });
};

exports.postAdd = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        req.body.image = req.file.filename;
        productsModel
            .addNewProduct(req.body)
            .then(() => {
                req.flash("added", true);
                res.redirect("/admin/add");
            })
            .catch(err => {
                res.redirect("/error");
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/admin/add");
    }
};

exports.getOrders = (req, res, next) => {
    ordersModel
        .getAllOrders()
        .then(items => {
            res.render("manage-orders", {
                pageTitle: "Manage Orders",
                isUser: true,
                isAdmin: true,
                items: items
            });
        })
        .catch(err => res.redirect("/error"));
};

exports.postOrders = (req, res, next) => {
    ordersModel
        .editOrder(req.body.orderId, req.body.status)
        .then(() => res.redirect("/admin/orders"))
        .catch(err => {
            res.redirect("/error");
        });
};

// exports.getDeleteProduct = (req, res, next) => {
//     res.render("delete-product", {
//         isUser: false,
//         isAdmin: true,
//         productAdded: req.flash("added")[0],
//     });
// };

// exports.getDeleteProduct = (req, res, next) => {
//     productsModel.deleteProduct(req.body.productName)
//         .then(item => {
//             res.render("delete-product", {
//                 item: item,
//                 isUser: false,
//                 isAdmin: true,
//                 validationError: req.flash("validationErrors")[0]
//             });
//         })
//         .catch(err => res.redirect("/error"));
// };

exports.postDelete = (req, res, next) => {
    productsModel.deleteProduct(req.body.productId).then(() => {
        res.redirect('/');
    }).catch(err=>console.log(err))
}

exports.getBlockUser = (req, res, next) => {
    res.render("block-user", {
        isUser: false,
        isAdmin: true,
        validationError: req.flash("validationErrors")[0]
    });
};

exports.postBlockUser = (req, res, next) => {
    // console.log(req);
    // console.log(req.body);
    // console.log(req.body.blockUser);
    if (req.body.blockUser) {
        authModel.blockUser(req.body.blockUser).then(() => {
            res.redirect('/admin/block');
        }).catch(err => console.log(err))
    }
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/admin/block");
    }
}