interface FoodData {
  foodName: string;
  foodStepsArray: string[];
  foodTriviaArray: string[];
  foodCalories: string;
  foodImg: string;
  imgAlt: string;
  date_of_food: Date;
  wikiLink: string;
  foodNutrient: string[];
}

type NutrientHintProps = {
  foodData: FoodData;
  count: number;
  displayMode: boolean;
};

const NutrientHint = ({ foodData, count, displayMode }: NutrientHintProps) => {
  return (
    <div className=" w-fit ">
      <h3 className="mb-1 mt-2 md:mt-0 font-light text-sm  text-gray-400">
        Nutrient
      </h3>
      <p
        className={`blurred-hint duration-300 
        ${displayMode ? "text-white" : "text-black"}`}
      >
        Kcal:{" "}
        <span
          className={`${
            count <= 0 ? " hidden -translate-x-8" : "blur-none  -translate-x-0"
          }`}
        >
          {foodData.foodCalories}{" "}
        </span>{" "}
        <br />
        Carbs:{" "}
        <span
          className={`${
            count <= 0 ? " hidden -translate-x-8" : "blur-none  -translate-x-0"
          }`}
        >
          {foodData.foodNutrient[0]}
        </span>{" "}
        <br />
        Fats:
        <span
          className={`${
            count <= 0 ? " hidden -translate-x-8" : "blur-none  -translate-x-0"
          }`}
        >
          {" "}
          {foodData.foodNutrient[1]}{" "}
        </span>
        <br />
        Protein:
        <span
          className={`${
            count <= 0 ? " hidden -translate-x-8" : "blur-none  -translate-x-0"
          }`}
        >
          {" "}
          {foodData.foodNutrient[2]}
        </span>{" "}
        <br />
      </p>
    </div>
  );
};

export default NutrientHint;
