const mongoose = require("mongoose");

const publicKeyUsedSchema = new mongoose.Schema(
  {
    publicHashed: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "PublicKeyUsed",
  }
);

module.exports = mongoose.model("PublicKeyUsed", publicKeyUsedSchema);
