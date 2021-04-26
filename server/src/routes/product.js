const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controller/product')
const { requireSignin, adminMiddleware, upload } = require('../middleware');
const path = require('path')
const shortid = require('shortid')

router.route('/products').post(requireSignin, adminMiddleware, upload.array("productPictures"), addProduct)
router.route('/products').get( getProducts)

module.exports = router;