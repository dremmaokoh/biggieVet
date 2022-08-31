const User = require('../models/models.user');
const Pet = require('../models/models.pet');
const cloudinary = require('../utils/cloudinary')




// exports.adminLogin = async (req, res, next) => {
//     const { email, password } = req.body;
//     try {
//       const validation = loginValidation(req.body);
//       if (validation.error)
//         return res
//           .status(400)
//           .json({ message: validation.error.details[0].message });
//       const admin = await Services.findUserByEmail({ email });
//       const isMatch = await passwordCompare(password, admin.password);
//       if (!isMatch) {
//         return res.status(400).json({
//           message: "Invalid credentials",
//         });
//       }
//       const payload = {
//         id: admin._id,
//       };
//       const token = jwtSign(payload);
//       res.cookie("access_token", token, { httpOnly: true });
//       const dataInfo = {
//         status: "success",
//         message: "Admin Logged in successful",
//         access_token: token,
//       };
//       return res.status(200).json(dataInfo);
//     } catch (error) {
//       next(error);
//     }
//   };

exports.addPet = async (req, res) => {
  try {
    const { userId, age, breedName, cost, petPicture, isBought} = req.body;
    const id = req.user.id;

    /* Finding the user by the id. */
    const checkUser = await User.findById({ _id: id });
    if (!checkUser) {
      return res.status(404).json({ message: 'not found' });
    }

    if (!( userId && age && breedName && cost && petPicture)) {
      return res.status(400).json({ message: 'please fill all fields' });
    }
    if (checkUser.role !== 'admin') {
      return res.status(404).json({ message: 'Unauthorized to add blog' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const new_blog = await Pet.create({
      age,
      breedName,
      cost,
      isBought,
      petPicture:result.secure_url,
      userId: checkUser.id,
    });

    return res.status(201).json(new_blog);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};


// exports.updatePet = async (req, res) => {
//     try {
//       const id = req.params._id;
//       const pet = await Pet.findOneAndUpdate(
//         { userId: id },
//         {
//           isBooked: true,
//         },
//         { new: true }
//       );
//       return res.status(200).json(pet);
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({ message: error.message });
//     }
//   };

  exports.updatePet = async (req, res) => {
    try {
      const { userId, age, breedName, cost, petPicture, isBought} = req.body
      const new_pet = await Pet.findByIdAndUpdate(
        { id: req.params._id },
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
        message: error.message
      });
    }
  };