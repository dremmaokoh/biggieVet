/* Importing the mongoose and validator packages. */
const mongoose = require('mongoose');
const validator = require('validator');

/* Creating a schema for the user model. */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a valid name'],
      unique: true
    },
     phoneNumber: {
        type: String,
        required: [true, 'Please enter a valid phone number'],
        unique: true
     },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
     
   
    },
    password: {
      type: String,
      minLength: 7,
      unique: true,
      required: true,
      validate(value) {
        if (value.toLowerCase().includes('pass')) {
          throw new Error("Passwords cannot contain 'pass'") }
      },
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
      },
  },
  {    
    timestamps: true
  });


  module.exports = mongoose.model('User', userSchema);