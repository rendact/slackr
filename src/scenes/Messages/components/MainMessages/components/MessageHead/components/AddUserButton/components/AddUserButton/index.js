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
      <span className="fa fa-user-plus fa-spin" />
    ) : (
      <span className="fa fa-user-plus" />
    )}
  </button>
);
