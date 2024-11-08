const express = require("express");
const userRouter = express.Router();
const { User, Show } = require("../../models/index.js");

const { check, validationResult } = require("express-validator");

userRouter.get("/", async (req, res) => {
  const allUsers = await User.findAll();
  res.json(allUsers);
});

userRouter.get("/:id", async (req, res) => {
  const userByID = await User.findByPk(req.params.id);
  res.json(userByID);
});

userRouter.get("/:id/shows", async (req, res) => {
  const userByIDwithShows = await User.findByPk(req.params.id, {
    include: Show,
  });
  res.json(userByIDwithShows);
});

userRouter.put("/:id/shows/:sid", async (req, res) => {
  const userByID = await User.findByPk(req.params.id);
  const showByID = await Show.findByPk(req.params.sid);
  await userByID.addShow(showByID);
  const userByIDwithShows = await User.findByPk(req.params.id, {
    include: Show,
  });
  res.json(userByIDwithShows);
});

module.exports = userRouter;
