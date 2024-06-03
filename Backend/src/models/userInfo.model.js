const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      required: true,
    },
    phoneNumber: {
      type: String,
      match: /^0\d{9}$/,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    CCCD: {
      type: String,
      match: /^0\d{11}$/,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    nationality: {
      type: String,
      default: "Việt Nam",
    },
    placeOfOrigin: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
    background: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "UserInfo",
  }
);

module.exports = mongoose.model("UserInfo", UserInfoSchema);
