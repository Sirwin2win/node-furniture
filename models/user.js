const mongoose = require('mongoose')

/**
 * User Schema
 */


const userSchema = mongoose.Schema({
    fullName: {
      type: String,
      required: [true, "fullname not provided "],
    },
    email: {
      type: String,
      unique: [true, "email already exists in database!"],
      lowercase: true,
      trim: true,
      required: [true, "email not provided"],
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: '{VALUE} is not a valid email!'
      }
  
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      required: [true, "Please specify user role"]
    },
    password: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    }
  });
  
  const User = mongoose.model('User', userSchema)

  module.exports = User