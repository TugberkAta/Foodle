import { useEffect, useState } from "react";
import AnswerField from "./AnswerField";
import PictureHint from "./hintComponents/PictureHint";
import TriviaHint from "./hintComponents/TriviaHint";
import StepsHint from "./hintComponents/StepsHint";
import NutrientHint from "./hintComponents/NutrientHint";
import ScoreBoard from "./summaryPanel/ScoreBoard";

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

type MainPageProps = {
  displayMode: boolean;
};

function MainPage({ displayMode }: MainPageProps) {
  const [count, setCount] = useState(0);
  const [gameState, setGameState] = useState("");
  const [foodData, setFoodData] = useState<FoodData | undefined>();
  const [playLock, setPlayLock] = useState<boolean>(false);
  const [answerCheck, setAnswerCheck] = useState<boolean | string>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/food/current", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setFoodData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div
        className={`w-full flex flex-col items-center justify-around bg-no-repeat bg-center bg-cover md:h-screen h-full ${
          displayMode
            ? "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/dark-mode.svg')]"
            : "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/light-mode.svg')]"
        }`}
      >
        {foodData && (
          <>
            <div className="flex flex-col items-center">
              <PictureHint foodData={foodData} count={count}></PictureHint>
              <div className="flex gap-20 pt-12 items-center">
                <div className="flex flex-col gap-5">
                  <div className="flex gap-5 items-center">
                    <NutrientHint
                      foodData={foodData}
                      count={count}
                      displayMode={displayMode}
                    ></NutrientHint>
                  </div>
                  <TriviaHint
                    foodData={foodData}
                    count={count}
                    displayMode={displayMode}
                  ></TriviaHint>
                </div>
                <StepsHint
                  foodData={foodData}
                  count={count}
                  displayMode={displayMode}
                ></StepsHint>
              </div>
            </div>
            <AnswerField
              foodData={foodData}
              count={count}
              setGameState={setGameState}
              setCount={setCount}
              setAnswerCheck={setAnswerCheck}
              answerCheck={answerCheck}
              setPlayLock={setPlayLock}
            />
            <ScoreBoard
              foodData={foodData}
              count={count}
              gameState={gameState}
              displayMode={displayMode}
              playLock={playLock}
            ></ScoreBoard>
          </>
        )}
      </div>
    </>
  );
}

export default MainPage;
