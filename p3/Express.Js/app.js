const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/user.route.js");

app.use("/user", userRoutes);

module.exports = app;
