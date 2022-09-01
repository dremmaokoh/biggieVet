const jwt = require("jsonwebtoken");
const { passwordHash, passwordCompare } = require("../helper/hashing");
const bcrypt = require("bcrypt");

const User = require("../models/models.user");

const {
  signUp,
  findUserByEmail,
  findUserByNumber,
} = require("../services/user.services");

const { jwtSign } = require("../helper/jwt");

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const isExisting = await findUserByNumber(email);
    if (isExisting) {
      return res.status(409).json({
        message: "Email Already existing",
      });
    }
    const sameNumber = await findUserByNumber(phoneNumber);
    if (sameNumber) {
      return res.status(409).json({
        message: "Phone Number Already existing",
      });
    }
    const hashedPassword = await passwordHash(password);

    const data = {
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    };
    const new_user = await signUp(data);

    return res.status(201).json({ message: "successfully added", new_user });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(409).json({
        message: "Email Already existing",
      });
    }
    const isMatch = await passwordCompare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const payload = {
      id: user._id,
    };

    const token = jwtSign(payload);
    res.cookie("access_token", token, { httpOnly: true });
    const dataInfo = {
      status: "success",
      message: "Login success",
      access_token: token,
    };
    return res.status(200).json(dataInfo);
  } catch (error) {
    next(error);
  }
};
