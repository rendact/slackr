import React from "react";

export default ({ onClick, isRight, isProcessing }) => (
  <button
    style={{
      float: isRight ? "right" : "",
      border: "none",
      background: "none"
    }}
    disabled={isProcessing}
    onClick={onClick}
  >
    {isProcessing ? (
      <span className="fa fa-user-times fa-spin" />
    ) : (
      <span className="fa fa-user-times" />
    )}
  </button>
);
