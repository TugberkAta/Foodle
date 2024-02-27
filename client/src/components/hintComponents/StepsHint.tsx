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

type StepsHintProps = {
  foodData: FoodData;
  count: number;
  displayMode: boolean;
};

const StepsHint = ({ foodData, count, displayMode }: StepsHintProps) => {
  return (
    <div>
      <h3 className="mb-1 md:text-left text-center font-light text-sm  text-gray-400">
        Cooking Steps
      </h3>
      <ol>
        {foodData.foodStepsArray.map((e, index) => (
          <li
            key={index}
            className={`duration-300 ${
              count <= 3 ? "blur-sm w-80 mb-2 translate" : "blur-none w-80 mb-2"
            } ${displayMode ? "text-white" : "text-black"}`}
          >
            {index + 1 + "- " + e}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default StepsHint;
