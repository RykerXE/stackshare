const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      index: true
    },
    profileImage: {
      type: String,
    },
    description: {
      type: String,
      default: 'I am a user of Stack Share'
    }
  },
  {
    timestamps: true
  }
);

const Users = mongoose.model('users', UserSchema);
module.exports =  Users;