import React from "react";

export default ({ onClick, isRight, isProcessing }) => (
  <button
    style={{
      border: "none",
      background: "none"
    }}
    onClick={onClick}
  >
    <span className="fa fa-pencil" />
  </button>
);
