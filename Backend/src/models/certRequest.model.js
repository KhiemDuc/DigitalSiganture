const mongoose = require("mongoose");

const certRequestSchema = new mongoose.Schema(
  {
    publicKey: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      // required: true,
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },
    nationality: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      match: /^0\d{9}$/,
      // required: true,
    },
    email: {
      type: String,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      // required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    face: {
      type: String,
      // required: true,
    },
    IdNum: {
      type: String,
      // required: true,
    },
    CCCD: {
      type: String,
      // required: true,
    },
    CCCDBack: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "REJECTED"],
      default: "PENDING",
    },
    rejectedReason: {
      type: String,
      default: null,
    },
    isExtend: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "CertRequests",
  }
);

module.exports = mongoose.model("CertRequest", certRequestSchema);
