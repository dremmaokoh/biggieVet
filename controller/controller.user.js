const jwt = require('jsonwebtoken');
const { passwordHash, passwordCompare } = require('../helper/hashing');
const bcrypt = require('bcrypt');

const User = require('../models');