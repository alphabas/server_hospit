const express = require("express");
const port = 3001;

const app = express();
const bodyParser = require("body-parser");
require("./db");
require("./models/Users");

const authRouter = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(authRouter);

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.listen(port, () => {
  console.log("Apk RUN AT====<>", port);
});
