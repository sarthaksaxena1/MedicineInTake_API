const mongoose = require("mongoose");
const Medicine = require("./medicine");
const { ObjectId } = mongoose.Schema;

const medicineIntakeSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ["taken"], default: "taken", trim: true },
    medicineSlot: { type: String, required: true, trim: true },
    medicineId: { type: ObjectId, ref: Medicine },
    currentDate: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const MedicineIntake = mongoose.model("medicineIntake", medicineIntakeSchema);
module.exports = MedicineIntake;
