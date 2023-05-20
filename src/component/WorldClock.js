import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorldClock() {
  const [displayTime, setDisplayTime] = useState("");
  const [selectedTimezone, setSelectedTimezone] = useState('');
  

  useEffect(() => {
    const fetchTime = async () => {
        if(selectedTimezone!=""){
      try {
        
        const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedTimezone}`);
        const data = await response.json();
        const options = {
            timeZone: selectedTimezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          };
        const currentTime = new Date(data.datetime);
        const hours = currentTime.getUTCHours();
        const minutes = currentTime.getUTCMinutes();

        const roundedDownTime = `${formatTime(hours)}:${formatTime(minutes)}`;

        setDisplayTime(currentTime.toLocaleTimeString('en-US', options))
      } catch (error) {
        console.error('Error fetching time:', error);
      }}
    };

    const interval = setInterval(fetchTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [selectedTimezone]);

  const handleSelectTimezone = (event) => {
    setSelectedTimezone(event.target.value);
    setDisplayTime("")
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };


  return (
    <div>
    <h2>World Clock</h2>
      <div>
        <select value={selectedTimezone} onChange={handleSelectTimezone}>
          <option value="">Select Timezone</option>
          <option value="America/Los_Angeles">PST (Pacific Standard Time)</option>
          <option value="Asia/Kolkata">IST (Indian Standard Time)</option>
        </select>
      </div>
    <div>
        {(selectedTimezone && (displayTime!="" ?
      <h2>{selectedTimezone}: {displayTime}</h2> : <h3>loading....</h3>)
        )}
    </div>
    </div>
  );
}

export default WorldClock;
