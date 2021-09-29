const express = require("express");
const {
  createMedicineIntake,
  takeMedicine,
  getMedicineIntakeData,
} = require("../controllers/medicineIntake");
const { verifyAccessToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/", verifyAccessToken, createMedicineIntake);
router.post("/:id", verifyAccessToken, takeMedicine);
router.put("/medicines-intake", verifyAccessToken, getMedicineIntakeData)

module.exports = router;
