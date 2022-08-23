const express = require('express');
const router = express.Router();

const {signUp,signIn, logout} = require('../controllers/userController');

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
router.route('/logout').get(logout);


module.exports= router;