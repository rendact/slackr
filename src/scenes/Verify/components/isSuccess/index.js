import React from "react";
import ReactCountdownClock from "react-countdown-clock";

export default ({ onComplete }) => (
  <div style={{ margin: "0 auto", maxWidth: 500 }}>
    you are verified, you will redirected into login page
    <ReactCountdownClock seconds={5} size={100} onComplete={onComplete} />
  </div>
);
