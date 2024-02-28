import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

type WrongAnswerIconProps = {
  count: number;
  wrongAnswerRef: number;
};

const WrongAnswerIcon = ({ count, wrongAnswerRef }: WrongAnswerIconProps) => {
  useEffect(() => {
    console.log(count >= wrongAnswerRef);
  }, [count, wrongAnswerRef]);
  return (
    <RxCross2
      className={`size-6 ${
        count >= wrongAnswerRef ? "text-red-600" : "text-gray-700"
      }`}
    ></RxCross2>
  );
};

export default WrongAnswerIcon;
