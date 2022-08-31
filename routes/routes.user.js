const router = require("express").Router();
const { signUp, loginUser } = require("../controller/controller.user");
const { findPets, orderPet } = require("../controller/controller.pet");
const { isAuth } = require("../middleware/isAuth");

router.post("/register", signUp);
router.post("/login", loginUser);
router.get("/pets", isAuth, findPets);
router.put("/order/:id", isAuth, orderPet);
module.exports = router;
