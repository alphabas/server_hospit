const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("Users");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .send({ error: "You must be logged in, key not given" });
  }
  const token = authorization.replace("Bearer", "");
  console.log(`TOKEN ===>>==> ${token}`);
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "You must be logged in, token invalid" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      req.user = userdata;
      next();
    });
  });
};
