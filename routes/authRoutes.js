const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("Users");
const jwt = require("jsonwebtoken");

require("dotenv");

router.post("/signup", (req, res) => {
  //   res.send("This id signup page");
  console.log("====>>", req.body);
  const { name, email, password, dob } = req.body;

  if (!email || !password || !name || !dob) {
    return res.status(422).send({ error: "Please fill all the fiels " });
  }

  User.findOne({ email: email }).then(async (savedUser) => {
    if (savedUser) {
      return res.status(422).send({ error: "Invalid credentials" });
    }

    const user = new User({
      name,
      email,
      password,
      dob,
    });

    try {
      await user.save();
      //   res.send({ message: "User saved successfully..." });
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET);
      res.send({ token });
    } catch (error) {
      console.log("DB ERR", error);
      res.status(422).send({ error: error.message });
    }
  });
});

module.exports = router;
