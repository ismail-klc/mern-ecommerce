const express = require('express');
const router = express.Router();
const { signup,signin, signout } = require('../../controller/admin/auth')

router.route('/admin/signup').post(signup)
router.route('/admin/signin').post(signin)
router.route('/admin/signout').post(signout)

module.exports = router;