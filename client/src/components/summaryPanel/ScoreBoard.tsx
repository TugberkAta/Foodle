import ScorePanel from "./ScorePanel.tsx";

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

type ScoreBoardProps = {
  foodData: FoodData;
  count: number;
  gameState: string;
  displayMode: boolean;
  playLock: boolean;
};

const ScoreBoard = ({
  foodData,
  count,
  gameState,
  displayMode,
  playLock,
}: ScoreBoardProps) => {
  return gameState === "" && !playLock ? (
    <></>
  ) : (
    <>
      <div
        className={`h-2/3 z-10 w-80 absolute score-screen rounded-sm text-center text-white flex flex-col justify-around bg-no-repeat bg-center bg-cover ${
          displayMode
            ? "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/circle-scatter-haikei-2.svg')]"
            : "bg-[url('/Users/tugberk/Documents/repos/Active-Fullstack-Projects/Foodle/client/src/assets/circle-scatter-haikei-2.svg')]"
        }`}
      >
        <div>
          <div className="-mb-9">
            {gameState === "won" ? (
              <>
                <h1 className="text-2xl text-green-300">You won!!</h1>
                <ScorePanel count={count} gameState={gameState}></ScorePanel>
              </>
            ) : gameState === "lost" ? (
              <>
                <h1 className="text-2xl text-amber-300">
                  {" "}
                  Better luck next time{" "}
                </h1>
                <ScorePanel count={count} gameState={gameState}></ScorePanel>
              </>
            ) : (
              <>
                <h1 className="text-2xl text-pink-300">
                  {" "}
                  Come back tomorrow &#x2665;{" "}
                </h1>
                <ScorePanel count={count} gameState={gameState}></ScorePanel>
              </>
            )}
            <div className="mt-2">
              <h2> The food was</h2>
              <p>{foodData.foodName}</p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="fixed w-screen h-screen top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]"></div>
    </>
  );
};

export default ScoreBoard;
