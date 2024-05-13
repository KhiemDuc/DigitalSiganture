const mongoose = require("mongoose");

const CASchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    versionKey: false,
    collection: "CA",
  }
);

module.exports = mongoose.model("CA", CASchema);
