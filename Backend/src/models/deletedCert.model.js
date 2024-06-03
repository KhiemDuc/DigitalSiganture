const mongoose = require("mongoose");

const deletedCertSchema = new mongoose.Schema(
  {
    certificate: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    collection: "DeletedCerts",
    timestamps: true,
  }
);

module.exports = mongoose.model("DeletedCert", deletedCertSchema);
