const mongoose = require("mongoose");
const counterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    seq: {
      type: Number,
      default: 0,
    },
  },
  { collection: "Counters" }
);

const counterModel = mongoose.model("Counter", counterSchema);

const dataSchema = new mongoose.Schema({
  bin: {
    type: String,
  },
  accountName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  orderCode: {
    type: Number,
  },
  paymentLinkId: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["PENDING", "PAID", "CANCELLED"],
  },
  reference: String,
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: {
      type: dataSchema,
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Orders",
  }
);

orderSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.isNew) {
    next();
    return;
  }
  const counter = await counterModel.findOneAndUpdate(
    { name: "order" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  doc.data.orderCode = counter.seq;
  next();
});

module.exports = mongoose.model("Order", orderSchema);
