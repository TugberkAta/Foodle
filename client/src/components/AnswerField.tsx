import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FoodData {
  foodName: string;
}

type AnswerFieldProps = {
  foodData: FoodData | undefined;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setGameState: React.Dispatch<React.SetStateAction<string>>;
  setAnswerCheck: React.Dispatch<
    React.SetStateAction<boolean | string | undefined>
  >;
  answerCheck: boolean | string | undefined;
  setPlayLock: React.Dispatch<React.SetStateAction<boolean>>;
};

const AnswerField = ({
  foodData,
  count,
  setCount,
  setGameState,
  setAnswerCheck,
  answerCheck,
  setPlayLock,
}: AnswerFieldProps) => {
  const [guess, setGuess] = useState("");
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [remountKey, setRemountKey] = useState(0);

  useEffect(() => {
    if (animationTrigger) {
      setRemountKey((prevKey) => prevKey + 1); // Increment the key to trigger remount
      const timer = setTimeout(() => {
        setAnimationTrigger(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [animationTrigger]);

  // Define animation variants for the input field
  const inputVariants = {
    wrong: {
      x: [0, -10, 10, 0],
      transition: { duration: 0.5 },
    }, // Shake effect
    close: { boxShadow: "0 0 8px 2px yellow", transition: { duration: 0.5 } }, // Glow effect
    correct: { scale: [1, 0.8, 1.2, 1], transition: { duration: 0.7 } }, // Scale up effect
  };

  // Determine which variant to use based on answerCheck
  const getVariant = () => {
    if (answerCheck === true) return "correct";
    else if (answerCheck === "close") return "close";
    else if (answerCheck === false) return "wrong";
    else return "entered"; // Default to entered after the initial animation
  };

  function search(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.keyCode === 13 && foodData) {
      const guessWords = guess.toLowerCase().split(" ");
      const matchingWords: string[] = [];
      const titleWords = foodData.foodName
        .replace(/[^a-z0-9\s]/gi, "")
        .toLowerCase()
        .split(" ");

      guessWords.forEach((word) => {
        if (titleWords.includes(word)) {
          matchingWords.push(word);
        }
      });

      if (
        matchingWords.length >= 2 ||
        titleWords.toString() === matchingWords.toString()
      ) {
        setAnswerCheck(true);
        setGameState("won");
        setPlayLock(true);
        setAnimationTrigger(true);
      } else if (count === 5) {
        setGameState("lost");
        setPlayLock(true);
        setAnimationTrigger(true);
      } else if (matchingWords.length === 1) {
        setAnswerCheck("close");
        setAnimationTrigger(true);
      } else {
        setAnswerCheck(false);
        setCount(count + 1);
        setAnimationTrigger(true);
      }
      console.log(answerCheck);
      console.log(guess);
      setGuess("");
    }
  }

  return (
    <>
      <motion.input
        className={`px-2 outline-none border-2 rounded-sm ${
          answerCheck === false ? `border-red-500 ` : "border-gray-500"
        } ${answerCheck === true ? ` border-green-400 ` : "border-gray-500"} ${
          answerCheck === "close" ? ` border-yellow-500 ` : "border-gray-500"
        } placeholder:text-gray-400`}
        type="text"
        onKeyDown={search}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter Guess"
        initial="initial"
        animate={getVariant()}
        variants={inputVariants}
        key={remountKey}
      />
    </>
  );
};

export default AnswerField;
