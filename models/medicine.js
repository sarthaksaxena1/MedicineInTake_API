const mongoose = require("mongoose");
const User = require("./user");
const { ObjectId } = mongoose.Schema;

const medicineSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true, trim: true },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, required: true, trim: true },
    takenTime: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    medicineType: {
      type: String,
      enum: ["Tablet", "Syrup"],
      default: "Tablet",
      required: true,
      trim: true,
    },
    medicineOwner: { type: ObjectId, ref: User },
  },
  { timestamps: true }
);

const Medicine = mongoose.model("medicine", medicineSchema);
module.exports = Medicine;
