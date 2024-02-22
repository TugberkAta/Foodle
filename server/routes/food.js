var express = require("express");
var router = express.Router();
const food_controller = require("../controllers/food_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/create", food_controller.register_food_post);

router.post("/", food_controller.all_foods_get);

module.exports = router;
