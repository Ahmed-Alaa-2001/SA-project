const { validationResult } = require("express-validator");
const authModel = require("../models/authModel")
const validator = require('express-validator').validationResult;
exports.getSignup = (req, res, next) => {
    res.render("signup", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        isAdmin: false,
        isUser: false
    });
}

exports.postSignup = (req, res, next) => {
    // return console.log(validationResult(req).array());
    console.log(validationResult(req));
    if (validationResult(req).isEmpty()) {
        // console.log(req.body);
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let phone = req.body.phone;
        let preferredPaymentMethod = req.body.preferredPaymentMethod;
        // console.log(req.preferredPaymentMethod);
        authModel.createNewUser(username, email, password,preferredPaymentMethod ,phone).then(() => {
            res.redirect('/login')
        }).catch(err => {
            req.flash('authError',err)
            res.redirect('/signup');
        })
    }
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect('/signup');
    }
} 

exports.getlogin = (req, res, next) => {
    //console.log(req.flash('aurhError')[0]);
    res.render("login", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        isAdmin: false,
        isUser: false
    });
}

exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        let email = req.body.email;
        let password = req.body.password;
        // console.log(email);
        // console.log(password);
        authModel.login(email, password).then(result => {
            req.session.userId = result.id,
            req.session.isAdmin = result.isAdmin
            res.redirect('/')
        }).catch(err => {
            //console.log(err);
            req.flash('authError', err)
            res.redirect('/login');
        })
    }
    else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect('/login');
    }
} 
exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    })
}

exports.getViewAccount = (req, res, next) => {
    authModel
    .ViewAccount(req.session.userId)
        .then(user => {
        // console.log(user);
        res.render("view-account", {
            pageTitle: "view-account",
            isUser: true,
            isAdmin: req.session.isAdmin,
            user: user
        });
    })
    .catch(err => res.redirect("/error"));
}