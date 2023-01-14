import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import {CircularProgressbar }from 'react-circular-progressbar';
const Circular =(props)=> {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 100) {
        setPercentage(percentage + 1);
      }
    }, 2000);
  }, [percentage]);

  return (
    <div className="app">
      <div style={{ width: 100, marginLeft: 70 }}>
      <CircularProgressbar value={props.progress}   text={`${props.progress}%`} />
      </div>
    </div>
  );
}
export default Circular;


