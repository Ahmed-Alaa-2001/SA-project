const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const orderController = require("../controllers/OrderController");
const authGuard = require("./guards/AuthGuard");


router.get("/orders", authGuard.isAuth, orderController.getOrder);

router.post(
    "/orders",
    authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    check("address")
        .not()
        .isEmpty()
        .withMessage("address is required"),
        orderController.postOrder
);
        
router.get("/verify-order", authGuard.isAuth, orderController.getOrderVerify);
router.post(
    "/orders/cancel",
    authGuard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    orderController.postCancel
);

module.exports = router;
