const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, max: 50, trim: true },
    password: { type: String, required: true, max: 50, trim: true },
    // maskedKey: { type: String, required: true, trim: true, max: 32 },
    // medicineIntakes: [
    //   {
    //     medicineName: { type: String, required: true, trim: true },
    //     startDate: { type: String, required: true, trim: true },
    //     endDate: { type: String, required: true, trim: true },
    //     takenTime: { type: String, required: true, trim: true },
    //     quantity: { type: Number, required: true, trim: true },
    //     medicineType: {
    //       type: String,
    //       enum: ["Tablet", "Syrup"],
    //       default: "Tablet",
    //       required: true,
    //       trim: true,
    //     }
    //   },
    // ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(this.password, salt);
      this.password = hashpassword;
      return next();
    }
    return next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model("user", userSchema);
module.exports = User;
