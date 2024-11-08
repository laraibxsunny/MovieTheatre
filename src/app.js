const express = require("express");
const app = express();
const { db } = require("../db/connection");
const userRouter = require("./routes/user.js");
const showRouter = require("./routes/show.js");

const port = 3000;

app.use(express.json());

app.use(express.urlencoded());

app.use("/users", userRouter);

app.use("/shows", showRouter);

module.exports = app;
