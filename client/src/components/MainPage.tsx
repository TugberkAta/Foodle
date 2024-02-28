import { useEffect, useState } from "react";
import AnswerField from "./AnswerField";
import PictureHint from "./hintComponents/PictureHint";
import TriviaHint from "./hintComponents/TriviaHint";
import StepsHint from "./hintComponents/StepsHint";
import NutrientHint from "./hintComponents/NutrientHint";
import ScoreBoard from "./summaryPanel/ScoreBoard";
import RegionHint from "./hintComponents/RegionHint";
import WrongAnswerIcon from "./utilities/WrongAnswerIcon";

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

type MainPageProps = {
  displayMode: boolean;
};

function MainPage({ displayMode }: MainPageProps) {
  const [count, setCount] = useState(0);
  const [gameState, setGameState] = useState("");
  const [foodData, setFoodData] = useState<FoodData | undefined>();
  const [answerCheck, setAnswerCheck] = useState<boolean | string>();
  const [playLock, setPlayLock] = useState<boolean>(() => {
    // Attempt to read the playLock value from local storage
    const savedPlayLock = localStorage.getItem("playLock");

    // If there's a value stored, parse it to a boolean and return it
    // Otherwise, default to false
    return savedPlayLock ? JSON.parse(savedPlayLock) : false;
  });

  useEffect(() => {
    localStorage.setItem("playLock", playLock.toString());
  }, [playLock]);

  useEffect(() => {
    if (foodData) {
      localStorage.setItem("foodName", String(foodData.foodName));
    }
  }, [foodData]);

  useEffect(() => {
    if (
      localStorage.getItem("foodName") != localStorage.getItem("foodNameOld")
    ) {
      setPlayLock(false);
      localStorage.setItem(
        "foodNameOld",
        localStorage.getItem("foodName") || ""
      );
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://foodle.fun/api/food/current", {
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
              <div className="flex gap-20 pt-12 items-center ">
                <div className="flex flex-col gap-5  justify-between h-full">
                  <div className="flex gap-5 items-center ">
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
                <div className="flex flex-col h-full justify-between">
                  <RegionHint
                    foodData={foodData}
                    count={count}
                    displayMode={displayMode}
                  ></RegionHint>
                  <StepsHint
                    foodData={foodData}
                    count={count}
                    displayMode={displayMode}
                  ></StepsHint>
                </div>
              </div>
            </div>
            <div className="flex">
              <WrongAnswerIcon
                count={count}
                wrongAnswerRef={1}
              ></WrongAnswerIcon>
              <WrongAnswerIcon
                count={count}
                wrongAnswerRef={2}
              ></WrongAnswerIcon>
              <WrongAnswerIcon
                count={count}
                wrongAnswerRef={3}
              ></WrongAnswerIcon>
              <WrongAnswerIcon
                count={count}
                wrongAnswerRef={4}
              ></WrongAnswerIcon>
              <WrongAnswerIcon
                count={count}
                wrongAnswerRef={5}
              ></WrongAnswerIcon>
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
