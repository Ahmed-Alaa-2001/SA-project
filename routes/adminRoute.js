const router = require("express").Router();
const check = require("express-validator").check;
const multer = require("multer");
const bodyParser = require("body-parser");

const adminController = require("../controllers/adminController");
const adminGuard = require("./guards/adminGuard");

router.get("/add", adminGuard, adminController.getAdd);
router.post(
    "/add",
    adminGuard,
    multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "images/");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        })
    }).single("image"),
    check("name")
        .not()
        .isEmpty()
        .withMessage("name is required"),
    check("price")
        .not()
        .isEmpty()
        .withMessage("price is required")
        .isFloat({ min: 0.0000000009 })
        .withMessage("price must be greater than 0"),
    check("description")
        .not()
        .isEmpty()
        .withMessage("description is required"),
    check("category")
        .not()
        .isEmpty()
        .withMessage("category is required"),
    check("image").custom((value, { req }) => {
        if (req.file) return true;
        else throw "image is required";
    }),
    adminController.postAdd
);

router.get("/orders", adminGuard, adminController.getOrders);

router.post(
    "/orders",
    adminGuard,
    bodyParser.urlencoded({ extended: true }),
    adminController.postOrders
);

router.post(
    '/delete',
    adminGuard,
    bodyParser.urlencoded({ extended: true }),
    adminController.postDelete
)

router.get("/block", adminGuard, adminController.getBlockUser);

router.post(
    '/block',
    adminGuard,
    check("blockUser").
        not().isEmpty()
        .withMessage('blockUser is required'),
    bodyParser.urlencoded({ extended: true }),
    adminController.postBlockUser
)

module.exports = router;
