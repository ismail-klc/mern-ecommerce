const express = require('express');
const router = express.Router();
const { signup, signin, signout, getUser } = require('../controller/auth');
const { requireSignin } = require('../middleware');

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/signout').post(signout)
router.route('/auth/me').get(requireSignin, getUser)

module.exports = router;