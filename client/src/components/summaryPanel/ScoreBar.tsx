type ScoreBarProps = {
  scoreProgression: number;
  index: number;
  score: number;
};

const ScoreBar = ({ scoreProgression, index, score }: ScoreBarProps) => {
  return (
    <div className="h-60 w-6 flex flex-col justify-end">
      <div
        className="bg-green-400 border-black border-b-8 flex justify-center items-end"
        style={{ height: `${scoreProgression}%` }}
      >
        <p className="text-black text-xs">{score === 0 ? "" : score}</p>
      </div>
      {index}
    </div>
  );
};

export default ScoreBar;
