const express = require('express');
const router = express.Router();
const { getCart, addToCart} = require('../controller/cart');
const { requireSignin, superAdminMiddleware,upload } = require('../middleware');

router.route('/cart').post(requireSignin, addToCart)
router.route('/cart').get( requireSignin, getCart)

module.exports = router;