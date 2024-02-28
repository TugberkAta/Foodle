const asyncHandler = require("express-async-handler");
const Food = require("../models/FoodInfo");
const PastFood = require("../models/PastFoodInfo");
const { body, validationResult } = require("express-validator");
const { DateTime } = require("luxon");
const cron = require("node-cron");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registering new food
exports.register_food_post = [
  //Validating Data
  body("foodName", "Cannot be empty").isString().trim().notEmpty(),
  body("foodImg", "Cannot be empty").isString().trim().notEmpty(),
  body("foodStepsArray", "Cannot be empty").isArray().notEmpty(),
  body("foodTriviaArray", "Cannot be empty").isArray().notEmpty(),
  body("foodCalories", "Cannot be empty").isString().trim().notEmpty(),
  body("foodNutrient", "Cannot be empty").isString().trim().notEmpty(),
  body("imgAlt", "Cannot be empty").isString().trim().notEmpty(),
  body("foodRegion", "Cannot be empty").isString().trim().notEmpty(),

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

      const foodNutrientArray = req.body.foodNutrient
        .trim()
        .split(",")
        .map((string) => string.trim());

      const foodRegionArray = req.body.foodRegion
        .trim()
        .split(",")
        .map((string) => string.trim());

      const food = new Food({
        foodName: req.body.foodName,
        foodImg: req.body.foodImg,
        foodCalories: req.body.foodCalories,
        foodStepsArray: req.body.foodStepsArray,
        foodTriviaArray: req.body.foodTriviaArray,
        foodRegion: foodRegionArray,
        foodNutrient: foodNutrientArray,
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
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const allFoods = await Food.find().sort({ date_of_food: -1 }).exec();
      res.send(allFoods);
    }
  });
});

// Get the oldest not used before food
exports.current_food_get = asyncHandler(async (req, res, next) => {
  try {
    const currentFood = await Food.findOne().sort({ date_of_food: 1 }).exec();
    res.send(currentFood);
  } catch (err) {
    console.error("Error fetching current food:", err);
    res.status(500).send("Server Error");
  }
});

// Schedule the cron job to run every day that removes
// current food saves it into past foods
cron.schedule("0 0 * * *", async () => {
  (async function moveToNextDay() {
    const allFoods = await Food.find().sort({ date_of_food: 1 }).exec();
    if (allFoods.length > 1) {
      const currentFood = await Food.findOne().sort({ date_of_food: 1 }).exec();
      try {
        const food = new PastFood({
          foodName: currentFood.foodName,
          foodImg: currentFood.foodImg,
          foodCalories: currentFood.foodCalories,
          foodStepsArray: currentFood.foodStepsArray,
          foodTriviaArray: currentFood.foodTriviaArray,
          foodNutrient: currentFood.foodNutrientArray,
          foodRegion: currentFood.foodRegion,
          imgAlt: currentFood.sanitizedImgAlt,
          date_of_food: currentFood.date_of_food,
        });
        const result = await food.save();
        if (result) {
          const deletedFood = await Food.findOneAndDelete()
            .sort({ date_of_food: 1 })
            .exec();
        }
      } catch (err) {
        console.error("Error saving to past food:", err);
      }
    } else return;
  })();
});
