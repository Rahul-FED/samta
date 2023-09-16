import React, { useState, useEffect } from 'react';
import './countdown.css'

function CountdownTimer() {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let countdown;

    if (isRunning) {
      countdown = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countdown);
            setIsRunning(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(countdown);
    }

    return () => {
      clearInterval(countdown);
    };
  }, [minutes, seconds, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value);
    if (newMinutes >= 1) {
      setMinutes(newMinutes);
      setSeconds(0);
    }
  };

  return (
    <div className="countdown-timer">
      <h1>Countdown Timer</h1>
      <div>
        <label htmlFor="timerInput">Set Timer (in minutes):</label>
        <input
          type="number"
          id="timerInput"
          min="1"
          value={minutes}
          onChange={handleMinutesChange}
        />
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
      <div>
        <p>
          Time Left: {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </p>
      </div><span>Project:- By Rahul Dixit</span>
    </div>
  );
  
}

export default CountdownTimer;