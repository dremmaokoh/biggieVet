const router = require('express').Router();
const upload = require('../utils/multer')
const { addPet } = require('../controller/controller.pet');
const { isAuth, validateAdmin } = require('../middleware/isAuth');
const path = require('path');



// create a new house
router.post('/create', isAuth, validateAdmin, upload.single('photo'), addPet);
module.exports = router;