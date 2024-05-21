const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Students",
  }
);

StudentSchema.index({ studentId: 1 });

module.exports = mongoose.model("Student", StudentSchema);
