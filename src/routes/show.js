const express = require("express");
const showRouter = express.Router();
const { User, Show } = require("../../models/index.js");

const { check, validationResult } = require("express-validator");

showRouter.get("/", async (req, res) => {
  const showUsers = await Show.findAll();
  res.json(showUsers);
});

showRouter.get("/:id", async (req, res) => {
  const showByID = await Show.findByPk(req.params.id);
  res.json(showByID);
});

showRouter.get("/:id/users", async (req, res) => {
  const showByIDwithUsers = await Show.findByPk(req.params.id, {
    include: User,
  });
  res.json(showByIDwithUsers);
});

showRouter.put("/:id/available", async (req, res) => {
  const showByID = await Show.findByPk(req.params.id);
  if (showByID.available == true) {
    await showByID.update({ available: false });
    res.json(showByID);
  } else if (showByID.available == false) {
    await showByID.update({ available: true });
    res.json(showByID);
  }
});

showRouter.delete("/:id", async (req, res) => {
  const showByID = await Show.findByPk(req.params.id);
  showByID.destroy();
  const showUsers = await Show.findAll();
  res.json(showUsers);
});

showRouter.get("/genre/:genre", async (req, res) => {
  const genreOfShows = await Show.findAll({
    where: { genre: req.params.genre },
  });
  res.json(genreOfShows);
});

module.exports = showRouter;
