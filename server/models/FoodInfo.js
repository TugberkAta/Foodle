const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FoodInfoSchema = new Schema({
  foodName: { type: String, required: true },
  foodImg: { type: String, required: true },
  foodPrice: { type: String, required: true },
  foodStepsArray: [{ type: String, required: true }],
  foodTrivia: { type: String, required: true },
  foodCalories: { type: Object, required: true },
});

module.exports = mongoose.model("FoodInfo", FoodInfoSchema);
