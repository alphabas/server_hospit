const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchemas = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },

  dob: {
    type: String,
    require: true,
  },
});

userSchemas.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, 8);
  console.log("Just before savings", user);
  next();
});

mongoose.model("Users", userSchemas);
