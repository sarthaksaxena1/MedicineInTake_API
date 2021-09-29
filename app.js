const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/medicine", medicineRoutes);

const port = process.env.PORT || 3002; //Getting Free Port On Server If 3000 Is Not Available

mongoose.connect(
  process.env.CONNECTION_URL,
  {
    //Connecting To Mongo DB Database Before Starting Node Server
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log("Error Connecting DB", err);
    else console.log("DB Connected Succesfully");
  }
);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
