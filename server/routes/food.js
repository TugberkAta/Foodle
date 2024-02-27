var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const food_controller = require("../controllers/food_controller");

router.get("/", verifyToken, food_controller.all_foods_get);

router.get("/current", food_controller.current_food_get);

router.post("/create", food_controller.register_food_post);

router.get("/create/login", (req, res) => {
  const user = {
    id: 1,
    username: "Sakallibob",
  };

  jwt.sign({ user }, process.env.SECRET_KEY, (error, token) => {
    res.json({
      token,
    });
  });
});

// Verify token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = router;
