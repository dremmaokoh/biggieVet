const User = require('../models/models.user');

exports.signUp = async (data) => {
  try {
    const user = new User(data);
    const savedUser = user.save();
    if (!savedUser) throw new Error('user not saved');
    return savedUser;
  } catch (error) {
    return { error: error.message };
  }
};

exports.findAll = async () => {
  try {
    const users = await User.find({});

    if (!users) throw new Error('users not found');

    return users;
  } catch (error) {
    return { error: error.message, data: null };
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

exports.findUsersById = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) throw new Error(`${id} not found`);

    return { error: null, data: user };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

exports.updateAUser = async (id, data) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) throw new Error();

    return { error: null, data: updatedUser };
  } catch (error) {
    return { error: error.message, data: null };
  }
};

exports.deleteOne = async (id) => {
  try {
    const isDeleted = await User.findByIdAndDelete(id);

    if (!isDeleted) throw new Error('');

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

exports.deleteAll = async () => {
  try {
    const isDeleted = await User.deleteMany({});

    if (!isDeleted) throw new Error('');

    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};