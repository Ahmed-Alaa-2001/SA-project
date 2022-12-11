const router = require('express').Router()
const homeController = require('../controllers/homeController')
const authGuard=require('./guards/AuthGuard')
router.get('/' ,homeController.gethome)

module.exports=router