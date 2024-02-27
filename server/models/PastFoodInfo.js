const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PastFoodInfo = new Schema({
  foodName: { type: String, required: true },
  foodStepsArray: [{ type: String, required: true }],
  foodTriviaArray: [{ type: String, required: true }],
  foodCalories: { type: String, required: true },
  foodRegion: [{ type: String, required: true }],
  foodImg: { type: String, required: true },
  imgAlt: { type: String, required: true },
  date_of_food: { type: Date, required: true },
  wikiLink: { type: String },
  foodNutrient: [{ type: String, required: true }],
});

module.exports = mongoose.model("PastFoodInfo", PastFoodInfo);
