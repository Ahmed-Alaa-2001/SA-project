const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const UserController = require('../controllers/UserController');
const authGuard=require("./guards/AuthGuard.js")
router.get("/signup", authGuard.notAuth,UserController.getSignup);
router.get("/login",authGuard.notAuth, UserController.getlogin);
router.post(
    "/signup",
    authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check('username').not().isEmpty().withMessage("username is required"),
    check('email')
        .not().
        isEmpty().withMessage("email is required")
        .isEmail().withMessage("invalid format"),
    check('password').isLength({ min: 6 }).withMessage("password must be at least 6 charachters"),
    /* (req, res, next) => {
        let value = req.body.confirmPassword;
        return check('confirmPassword').equals(value);
    },*/
    check('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password) return true;
        else throw 'passwords don\'t equal';
    }),
    check('phone').not().isEmpty().withMessage("phone is required"),
    check('preferredPaymentMethod').not().isEmpty().withMessage("preferredPaymentMethod is required"),
    UserController.postSignup
);
router.post(
    "/login",
    authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check('email')
    .not().
    isEmpty().withMessage("email is required")
    .isEmail().withMessage("invalid format"),
    check('password').isLength({ min: 6 }).withMessage("password must be at least 6 charachters"),
    UserController.postLogin
);

router.get("/view-account", authGuard.isAuth,UserController.getViewAccount);

router.all('/logout',authGuard.isAuth,UserController.logout)

module.exports=router