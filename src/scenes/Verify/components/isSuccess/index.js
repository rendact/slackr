import React from "react";
import ReactCountdownClock from "react-countdown-clock";

export default ({ onComplete }) => (
  <div>
    you are verified, you will redirected into login page
    <ReactCountdownClock seconds={30} size={100} onComplete={onComplete} />
  </div>
);
