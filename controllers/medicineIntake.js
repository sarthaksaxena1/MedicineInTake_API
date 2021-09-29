const Medicine = require("../models/medicine");
const MedicineIntake = require("../models/medicineIntake");
const User = require("../models/user");

exports.createMedicineIntake = async (req, res) => {
  req.body.startDate = new Date(req.body.startDate).toLocaleString();
  req.body.endDate = new Date(req.body.endDate).toLocaleString();
  req.body.medicineOwner = req.user._id;

  await new Medicine(req.body)
    .save()
    .then(() =>
      res
        .status(200)
        .json({ message: "New medicine taken time is successfully added." })
    )
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong." });
    });
};

exports.takeMedicine = async (req, res) => {
  req.body.medicineId = req.params.id;

  const validMedicineId = await Medicine.findOne(req.params.id);

  if (validMedicineId) {
    await new MedicineIntake(req.body)
      .save()
      .then(() =>
        res
          .status(200)
          .json({ message: "New medicine taken time is successfully added." })
      )
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong." });
      });
  } else {
    return res.status(400).json({ message: "Not a valid medicine" });
  }
};

exports.getMedicineIntakeData = async (req, res) => {
  const data = await Medicine.find({
    medicineOwner: req.user._id,
    startDate: new Date(req.body.startDate).toLocaleString(),
  });

  const arr = [];

  for (let i = 0; i < data.length; i++) {
    var result = await MedicineIntake.findOne({ medicineId: data[i]._id });
    arr.push(result);
  }

  const medicinesNotTaken = [];

  const medicinesTaken = data?.filter((o) =>
    arr?.some((i) => {
      if (o?._id?.toString() == i?.medicineId?.toString()) {
        return true;
      } else {
        medicinesNotTaken.push(o);
      }
    })
  );

  return res.status(200).json({ medicinesTaken, medicinesNotTaken });
};
