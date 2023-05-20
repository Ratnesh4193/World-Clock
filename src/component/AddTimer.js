import React, { useState, useEffect } from 'react';
import './AddTimer.css'
function AddTimer() {

  const [timers, setTimers] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newTimer, setNewTimer] = useState('');
  const [countdowns, setCountdowns] = useState({});
  const [id, setId] = useState(1)

  useEffect(() => {
    
    const timerInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const handleAddTimer = () => {
    const newCountdowns = { ...countdowns };
    newCountdowns[newTimer] = newTimer*100;
    setCountdowns(newCountdowns);

    const timerId = setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const updatedCountdowns = { ...prevCountdowns };
        updatedCountdowns[newTimer] -= 1;
        if (updatedCountdowns[newTimer]<= 0) {
          clearInterval(timerId);
          delete updatedCountdowns[newTimer];
        }
        return updatedCountdowns;
      });
    }, 10);

    setTimers((prevTimers) => [...prevTimers, { name: newTimer, timerId }]);
    setNewTimer('');
  };

  const handleRemoveTimer = (timerId) => {
    clearInterval(timerId);
    setTimers((prevTimers) => prevTimers.filter((timer) => timer.timerId !== timerId));
  };

  const formatTime = (time) => {
    time=Math.floor(time)
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div>
      <h2>Countdown Timer</h2>
      <div className="card">
      <div className='item'>
        <input
          type="text"
          pattern="[0-9]*"
          placeholder="Enter the time in seconds"
          value={newTimer}
          onChange={(e) => {if(isNaN(e.target.value)==0)setNewTimer(e.target.value)}}
        />
        </div>
          <div className='item'>
        <button onClick={handleAddTimer}>Add Timer</button>
        </div>
      </div>
      {timers.map((timer) => (
         <div className="card">
          <div className='item'>
            {formatTime( (countdowns[timer.name] || 0)/6000 )} : {formatTime(((countdowns[timer.name] || 0)%6000)/100)} : {formatTime((countdowns[timer.name] || 0)%100)}
          </div>
          <div className='item'>
            <button onClick={() => handleRemoveTimer(timer.timerId)}>Remove Timer</button>
          </div>
          </div>
      ))}
      </div>
  );
}

export default AddTimer;
