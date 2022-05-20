const asynHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = asynHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("No authorization");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("No authorization, no token");
  }
});

module.exports = protect;
