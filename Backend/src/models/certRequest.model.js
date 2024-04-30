const mongoose = require("mongoose");

const certRequestSchema = new mongoose.Schema(
  {
    publicKey: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "CertRequests",
  }
);

module.exports = mongoose.model("CertRequest", certRequestSchema);
