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

type CaloriesHintProps = {
  foodData: FoodData;
  count: number;
  displayMode: boolean;
};

const CaloriesHint = ({ foodData, count, displayMode }: CaloriesHintProps) => {
  return (
    <div className="border-b-2 border-gray-400 w-fit">
      <h3 className="mb-1 mt-2 md:mt-0 font-light text-sm  text-gray-400">
        Calories
      </h3>
      <p
        className={`blurred-hint duration-300 ${
          count <= 0
            ? "blur-sm opacity-0 -translate-x-8"
            : "blur-none opacity-100 -translate-x-0"
        }
        ${displayMode ? "text-white" : "text-black"}`}
      >
        {foodData.foodCalories}
      </p>
    </div>
  );
};

export default CaloriesHint;
