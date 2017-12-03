import React, { Component } from "react";
import IsProcess from "./components/isProcess";
import IsSuccess from "./components/isSuccess";

export default () => (
  <div>
    <IsProcess />
    <IsSuccess onComplete={() => {}} />
    Verification page
  </div>
);
