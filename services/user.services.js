const User = require("../models/models.user");

exports.signUp = async (data) => {
  try {
    const user = new User(data);
    const savedUser = user.save();
    if (!savedUser) throw new Error("user not saved");
    return savedUser;
  } catch (error) {
    return { error: error.message };
  }
};

exports.findUserByEmail = async (email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    return false;
  }
  return user;
};

exports.findUserByNumber = async (phoneNumber) => {
  const user = await User.findOne({
    phoneNumber,
  });
  if (!user) {
    return false;
  }
  return user;
};
