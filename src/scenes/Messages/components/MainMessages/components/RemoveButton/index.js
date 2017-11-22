import React from "react";

export default ({ onClick, isRight }) => (
  <span className="fa fa-trash" style={{ float: isRight ? "right" : "" }} />
);
