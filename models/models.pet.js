const mongoose = require('mongoose');
const validator = require('validator');

const petSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    breedName: {
          type: String,
          required: [true, 'Please enter a valid name'],
        },
        age: {
            type: String,
            required: [true, 'Please fill in the age']
         },
        isBought: {
          type: Boolean,
          default: false,
        },
        petPicture: {
          type: String,
          required: [true, 'please enter a valid image'],
          
        },
        cost: {
          type: String,
          required: [true, 'Please fill in the cost'],
          
        },
      },
      {
        capped: {
          size: 1024 * 1024 * 1024, // 1GB Maximum size
          autoIndexId: true,
        },
        timestamps: true,
        
      }
    );
    module.exports = mongoose.model('Pet', petSchema);