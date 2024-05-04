const mongoose = require("mongoose");
const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    tier: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "Plans",
  }
);

module.exports = mongoose.model("Plan", planSchema);
