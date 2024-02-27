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
  foodRegion: string[];
}

type RegionHintProps = {
  foodData: FoodData;
  count: number;
  displayMode: boolean;
};

const RegionHint = ({ foodData, count, displayMode }: RegionHintProps) => {
  return (
    <div className="">
      <h3 className="mb-1 mt-2 md:mt-0 font-light text-sm  text-gray-400">
        Region
      </h3>
      {foodData.foodRegion.map((region, index) => (
        <p
          key={index}
          className={`blurred-hint duration-300 ${
            count <= 1
              ? "blur-sm select-none opacity-0 -translate-x-8"
              : "blur-none opacity-100 -translate-x-0"
          } ${displayMode ? "text-white" : "text-black"}`}
        >
          {region}
        </p>
      ))}
    </div>
  );
};

export default RegionHint;
