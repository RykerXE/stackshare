const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserRegistrationSchema = new Schema(
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
    isApproved: Boolean,
  },
  {
    timestamps: true
  }
);

const UserRegistration = mongoose.model("registrations", UserRegistrationSchema);
module.exports = UserRegistration;