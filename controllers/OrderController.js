const cartModel = require("../models/CartModel");
const orderModel = require("../models/OrderModel");

const validationResult = require("express-validator").validationResult;

exports.getOrderVerify = (req, res, next) => {
    cartModel
        .getItemById(req.query.order)
        .then(cartItem => {
            res.render("verify-order", {
                cart: cartItem,
                isUser: true,
                isAdmin: req.session.isAdmin,
                pageTitle: "Verify Order",
                validationError: req.flash("validationErrors")[0]
            });
        })
        .catch(err => res.redirect("/error"));
};

exports.getOrder = (req, res, next) => {
    orderModel
        .getOrdersByUser(req.session.userId)
        .then(items => {
            res.render("orders", {
                pageTitle: "Orders",
                isUser: true,
                isAdmin: req.session.isAdmin,
                items: items
            });
        })
        .catch(err => res.redirect("/error"));
};

exports.postOrder = (req, res, next) => {
    if (validationResult(req).isEmpty())
        orderModel
            .addNewOrder(req.body)
            .then(() => res.redirect("/orders"))
            .catch(err => {
                res.redirect("/error");
            });
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/verify-order?order=" + req.body.cartId);
    }
};

exports.postCancel = (req, res, next) => {
    orderModel
        .cancelOrder(req.body.orderId)
        .then(() => res.redirect("/orders"))
        .catch(err => {
            res.redirect("/error");
        });
};


exports.editOrder = (id, newStatus) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Order.updateOne({ _id: id }, { status: newStatus });
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
