const productsModel = require('../models/productsModel')

// exports.getProduct = (req, res, next) => {
//     productsModel.getFirstProduct().then(product => {
//         res.render('product', {
//             product: product,
//             isAdmin: req.session.isAdmin,
//             isUser: req.session.userId,
//         })
//     })
// }
exports.getProductById = (req, res, next) => {
    //get id
    //get product
    // render
    let id = req.params.id;
    productsModel.getProductById(id).then(product=> {
        console.log(product);
        console.log(product.price);
        res.render('product', {
            product: product,
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId,
        })
    })
}

exports.getProductByName = (req, res, next) => {
    //get id
    //get product
    // render
    // console.log(req.query);
    let name = req.query.productName;
    // console.log(name);
    productsModel.getProductByName(name).then(product=> {
        // console.log(product[0]);
        // console.log(product[0].price);
        res.render('product', {
            product: product[0],
            isAdmin: req.session.isAdmin,
            isUser: req.session.userId,
        })
    })
}

