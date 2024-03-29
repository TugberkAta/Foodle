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

type TriviaHintProps = {
  foodData: FoodData;
  count: number;
  displayMode: boolean;
};

const TriviaHint = ({ foodData, count, displayMode }: TriviaHintProps) => {
  return (
    <div className="border-b-2 border-gray-400 w-80">
      <h3 className="mb-1 mt-2 md:mt-0 font-light text-sm  text-gray-400">
        Trivia
      </h3>
      {foodData.foodTriviaArray.map((trivia, index) => (
        <p
          key={index}
          className={`blurred-hint duration-300 ${
            count <= 2
              ? "blur-sm select-none opacity-0 -translate-x-8"
              : "blur-none opacity-100 -translate-x-0"
          } ${displayMode ? "text-white" : "text-black"}`}
        >
          {trivia}
        </p>
      ))}
    </div>
  );
};

export default TriviaHint;
