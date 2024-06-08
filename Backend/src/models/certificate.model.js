const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema(
  {
    certPem: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Certificates",
  }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
