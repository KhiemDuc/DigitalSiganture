const mongoose = require("mongoose");

const SigningHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    action: {
      type: String,
      enum: ["SIGNED", "REJECTED"],
      required: true,
    },
    signAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: false,
    collection: "SigningHistory",
  }
);

module.exports = mongoose.model("SigningHistory", SigningHistorySchema);
