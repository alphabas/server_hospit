const mongoose = require("mongoose");

require("dotenv").config();
require("./models/Users");
const mongoDb_URL =
  "mongodb+srv://alphabas22:alphabas1256@cluster0.axu69n5.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoDb_URL)
  .then(() => {
    console.log("Connected to DB...");
  })
  .catch((err) => {
    console.log("====<>", err);
  });
