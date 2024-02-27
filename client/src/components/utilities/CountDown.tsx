import { useState, useEffect } from "react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    // Use UTC methods to get the current UTC date and time
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const day = now.getUTCDate();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    // Calculate the next day's midnight in UTC
    const midnightUTC = Date.UTC(year, month, day + 1);
    const difference =
      midnightUTC - Date.UTC(year, month, day, hours, minutes, seconds);

    let timeLeft: TimeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div>
      <h1>Next Foodle In</h1>
      <h2>
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </h2>
    </div>
  );
};

export default Countdown;
