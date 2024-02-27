import { useEffect, useState } from "react";
import ScoreBar from "./ScoreBar";

type ScorePanelProps = {
  count: number;
  gameState: string;
};

const ScorePanel = ({ count, gameState }: ScorePanelProps) => {
  const [score1, setScore1] = useState(
    parseInt(localStorage.getItem("score1") || "0")
  );
  const [score2, setScore2] = useState(
    parseInt(localStorage.getItem("score2") || "0")
  );
  const [score3, setScore3] = useState(
    parseInt(localStorage.getItem("score3") || "0")
  );
  const [score4, setScore4] = useState(
    parseInt(localStorage.getItem("score4") || "0")
  );
  const [score5, setScore5] = useState(
    parseInt(localStorage.getItem("score5") || "0")
  );
  const [totalGamePlayed, setTotalGamePlayed] = useState(
    parseInt(localStorage.getItem("totalGamePlayed") || "0")
  );

  useEffect(() => {
    if (gameState === "won") {
      switch (count) {
        case 0:
          setScore1((prev) => prev + 1);
          break;
        case 1:
          setScore2((prev) => prev + 1);
          break;
        case 2:
          setScore3((prev) => prev + 1);
          break;
        case 3:
          setScore4((prev) => prev + 1);
          break;
        case 4:
          setScore5((prev) => prev + 1);
          break;

        default:
          break;
      }
    }
  }, [gameState, count]);

  // Update total games played and save to local storage
  useEffect(() => {
    const newTotal = score1 + score2 + score3 + score4 + score5;
    setTotalGamePlayed(newTotal);
    localStorage.setItem("totalGamePlayed", newTotal.toString());
  }, [score1, score2, score3, score4, score5]);

  // Save individual scores to local storage
  useEffect(() => {
    localStorage.setItem("score1", score1.toString());
  }, [score1]);
  useEffect(() => {
    localStorage.setItem("score2", score2.toString());
  }, [score2]);
  useEffect(() => {
    localStorage.setItem("score3", score3.toString());
  }, [score3]);
  useEffect(() => {
    localStorage.setItem("score4", score4.toString());
  }, [score4]);
  useEffect(() => {
    localStorage.setItem("score5", score5.toString());
  }, [score5]);

  const calculateProgression = (score: number) => {
    return totalGamePlayed > 0 ? (score * 100) / totalGamePlayed : 0;
  };

  return (
    <div className="flex flex-col items-center">
      {gameState === "won" && (
        <p className="text-xs">You got it in {count + 1} </p>
      )}
      <div className="flex gap-3">
        <ScoreBar
          scoreProgression={calculateProgression(score1)}
          score={score1}
          index={1}
        />
        <ScoreBar
          scoreProgression={calculateProgression(score2)}
          score={score2}
          index={2}
        />
        <ScoreBar
          scoreProgression={calculateProgression(score3)}
          score={score3}
          index={3}
        />
        <ScoreBar
          scoreProgression={calculateProgression(score4)}
          score={score4}
          index={4}
        />
        <ScoreBar
          scoreProgression={calculateProgression(score5)}
          score={score5}
          index={5}
        />
      </div>
    </div>
  );
};

export default ScorePanel;
