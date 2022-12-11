const router = require('express').Router()
const productController = require('../controllers/productController')

// router.get('/',productController.getProduct)
router.get('/',productController.getProductByName)
router.get('/:id',productController.getProductById)

module.exports = router
