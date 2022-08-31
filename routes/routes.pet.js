const router = require("express").Router();
const upload = require("../utils/multer");
const {
  addPet,
  updatePet,
  deletePet,
} = require("../controller/controller.pet");
const { isAuth, validateAdmin } = require("../middleware/isAuth");

router.post(
  "/create",
  isAuth,
  validateAdmin,
  upload.single("petPicture"),
  addPet
);
router.put("/update/:id", isAuth, validateAdmin, updatePet);
router.delete("/delete/:id", isAuth, validateAdmin, deletePet);
module.exports = router;