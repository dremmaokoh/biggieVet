const router = require('express').Router();
const upload = require('../utils/multer')
const { signUp , loginUser } = require('../controller/controller.user');
const { isAuth, validateAdmin } = require('../middleware/isAuth');
const path = require('path');

//sign up user
router.post('/register' , signUp);
//loginUser
router.post ('/login' ,  loginUser);

module.exports = router;