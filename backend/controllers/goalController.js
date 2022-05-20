const asynHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

const getGoals = asynHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

const setGoals = asynHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

const updateGoals = asynHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  if (!req.user) {
    res.status(400);
    throw new Error("User not found!");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("No authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

const deleteGoals = asynHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User not found!");
  }

  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("No authorized");
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
