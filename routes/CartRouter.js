const router = require("express").Router();
const bodyParser = require("body-parser");
const  check  = require("express-validator").check;
const CartController = require("../controllers/CartController");
const AuthGuard = require("./guards/AuthGuard")

router.get('/',AuthGuard.isAuth,CartController.getCart)

router.post("/",
    AuthGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check('amount').
        not().isEmpty().withMessage('amount is required')
        .isInt({ min: 1 }).withMessage('amount must be greater than zero')
    ,
    CartController.postCart
)
router.post('/save',
    AuthGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check('amount').
    not().isEmpty().withMessage('amount is required')
    .isInt({ min: 1 }).withMessage('amount must be greater than zero'),
    CartController.postSave
)

router.post('/delete',
    AuthGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    CartController.postDelete
)

module.exports = router;
