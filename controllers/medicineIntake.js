const Medicine = require("../models/medicine");
const MedicineIntake = require("../models/medicineIntake");
const User = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash");

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
  req.body.currentDate = new Date().toLocaleString();

  const validMedicineId = await Medicine.findOne(
    mongoose.Types.ObjectId(req.params.id)
  );

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
  // console.log(data);
  const arr2 = arr.filter((item) => item != null);
  console.log("arr2", arr2);
  console.log("data", data);
  const medicinesTaken = [];

  arr2?.map((o) =>
    data?.map((i) => {
      if (o?.medicineId?.toString() == i?._id?.toString()) {
        medicinesTaken.push(i);
      }
    })
  );

  for (var i = 0; i < medicinesTaken.length; i++) {
    _.remove(data, medicinesTaken[i]);
  }

  return res.status(200).json({ medicinesTaken, medicinesNotTaken: data });
};
