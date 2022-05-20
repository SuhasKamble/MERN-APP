const express = require("express");
const {
  getGoals,
  setGoals,
  deleteGoals,
  updateGoals,
} = require("../controllers/goalController");
const protect = require("../middleware/authHandler");
const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").delete(protect, deleteGoals).put(protect, updateGoals);

module.exports = router;
