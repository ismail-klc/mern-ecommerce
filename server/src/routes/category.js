const express = require('express');
const { addCategory, getCategories, updateCategory } = require('../controller/category');
const router = express.Router();
const { requireSignin, superAdminMiddleware,upload } = require('../middleware');
const path = require('path')
const shortid = require('shortid')

router.route('/categories').post(requireSignin, superAdminMiddleware, upload.single("categoryImage"),addCategory)
router.route('/categories').get( getCategories)
router.route('/categories').put(requireSignin, superAdminMiddleware, updateCategory)

module.exports = router;