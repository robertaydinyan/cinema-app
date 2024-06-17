import React, { useState } from 'react';

const TimeInput = () => {
  const [time, setTime] = useState('');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <label htmlFor="timeInput">Select a time (24-hour format):</label>
      <input
        type="time"
        id="timeInput"
        name="timeInput"
        value={time}
        onChange={handleChange}
        pattern="[0-9]{2}:[0-9]{2}"
        required
      />
    </div>
  );
};

export default TimeInput;
