const User = require("../models/models.user");
const Pet = require("../models/models.pet");
const cloudinary = require("../utils/cloudinary");

exports.addPet = async (req, res) => {
  try {
    const { age, breed, cost, petPicture, isAvailable } = req.body;
    const id = req.user.id;

    /* Finding the user by the id. */
    const checkUser = await User.findById({ _id: id });
    if (!checkUser) {
      return res.status(404).json({ message: "not found" });
    }

    if (checkUser.role !== "admin") {
      return res.status(404).json({ message: "Unauthorized to add blog" });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const new_blog = await Pet.create({
      age,
      breed,
      cost,
      isAvailable,
      petPicture: result.secure_url,
    });

    return res.status(201).json(new_blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.updatePet = async (req, res) => {
  const id = req.params.id;
  try {
    const { age, breed, cost, petPicture, isAvailable } = req.body;
    const new_pet = await Pet.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      {
        new: true,
      }
    );
    const pet_update = {
      message: "Updated successfully",
      new_pet,
    };
    return res.status(200).json(pet_update);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deletePet = async (req, res) => {
  const id = req.params.id;
  try {
    const delete_pet = await Pet.findByIdAndDelete({ _id: id });
    const pet_delete = {
      message: "Pet Profile Deleted",
      delete_pet,
    };
    return res.status(200).json(pet_delete);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.findPets = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const all_pets = await Pet.find()
      .sort({ createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit * 1);

    return res.status(200).json({ count: all_pets.length, data: all_pets });
  } catch (error) {
    next(error);
  }
};

exports.orderPet = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findOneAndUpdate(
      { _id: id },
      {
        $inc: { isAvailable: -1 },
      },
      {
        new: true,
      }
    );
    if ((pet.isAvailable < 0)) {
      return res.status(404).json({
        message: "Pet Not Available",
      });
    }
    const data = {
      message: "Purchase Completed",
      pet,
    };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
