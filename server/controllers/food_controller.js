const asyncHandler = require("express-async-handler");
const Food = require("../models/FoodInfo");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");

// Registering new food
exports.register_food_post = [
  //Validating Data
  body("foodName", "Cannot be empty").isString().trim().notEmpty(),
  body("foodImg", "Cannot be empty").isString().trim().notEmpty(),
  body("foodPrice", "Cannot be empty").isString().trim().notEmpty(),
  body("foodStepsArray", "Cannot be empty").isArray().notEmpty(),
  body("foodTrivia", "Cannot be empty").isString().trim().notEmpty(),
  body("foodCalories", "Cannot be empty").isString().trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    console.log(validationResult(req));
    const errors = validationResult(req);

    // Incase of errors refresh the page
    if (!errors.isEmpty()) {
      console.log("error while validating in the backend");
      res.redirect("http://localhost:5173/create-food");
      return;
    }
    // Register the food to the database
    try {
      // sanitize the image description to be suitable for the html
      const sanitizedImgAlt = req.body.imgAlt
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");

      const food = new Food({
        foodName: req.body.foodName,
        foodImg: req.body.foodImg,
        foodPrice: req.body.foodPrice,
        foodStepsArray: req.body.foodStepsArray,
        foodTrivia: req.body.foodTrivia,
        foodCalories: foodCalories,
        imgAlt: sanitizedImgAlt,
        date_of_food: DateTime.now(),
      });
      const result = await food.save();
      res.redirect("http://localhost:5173/create-food");
    } catch (err) {
      console.error("Error saving food:", err);
      res.status(500).send("Server Error");
    }
  }),
];

// get all saved foods
exports.all_foods_get = asyncHandler(async (req, res, next) => {
  const allFoods = await Article.find().sort({ date_of_food: -1 }).exec();
  res.send(allFoods);
});
