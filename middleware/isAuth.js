const jwt = require('jsonwebtoken');
const User = require('../models/models.user');
const Pet = require('../models/models.pet');
const dotenv = require('dotenv');
dotenv.config();
const { JWT_SECRET } = process.env; // const JWT_SECRET =process.env.JWT_SECRET

exports.isAuth = async (req, res, next) => {
  try {
    

    //Bearer token
    const token =
      req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const decoded = await jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;
    console.log('==========================================req.user');
    console.log(req.user);
    console.log('==========================================req.user');

    next();
  } catch (e) {
    return res.status(401).json(`signUp as user || Token expired  \n ${e}`);
  }
};

exports.validateAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    console.log(role);
    if (role === 'admin') {
      next();
    } else {
      throw new Error('You are not authorized to access this route', '', 401);
    }
  } catch (err) {
    return res.status(500).json({ error: error });
  }
}