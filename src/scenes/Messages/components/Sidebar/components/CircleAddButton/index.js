import React, { Component } from "react";

export default ({ isRight, onClick }) => (
  <a href="#head" onClick={onClick}>
    <span
      className="fa fa-plus-circle"
      style={{ float: isRight ? "right" : "initial" }}
    />
  </a>
);
