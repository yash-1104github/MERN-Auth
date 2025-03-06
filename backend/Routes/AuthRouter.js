const { signup, login, resetpassword } = require('../Controllers/AuthController');
const { signupValidation, loginValidation, passwordValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup',  signupValidation, signup);
router.patch('/resetpassword', passwordValidation, resetpassword);

module.exports = router;

