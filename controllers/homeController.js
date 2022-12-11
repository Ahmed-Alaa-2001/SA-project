const productsModel = require('../models/productsModel')

exports.gethome = (req, res, next) => {
    //get products
    //render index.ejs
    // console.log(products)
    let category = req.query.category;
    let validCategories=['clothes','phones','test']
    if (category && validCategories.includes(category)) {
        productsModel.getProductByCategory(category).then(products => {
            res.render('index', {
                products: products,
                isAdmin: req.session.isAdmin,
                isUser: req.session.userId,
                validationErrors:req.flash('validationErrors')[0]
            })
        })
    }
    else {
        productsModel.getAllProducts().then(products => {
            res.render('index', {
                products: products,
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin,
                validationErrors:req.flash('validationErrors')[0]
            })
        })
    }
}