import React, { Component } from "react";
import { InputGroupAddon } from "reactstrap";

class SnippetInputContainer extends Component {
  render() {
    return (
      <InputGroupAddon style={{ cursor: "pointer" }}>
        <span className="fa fa-code" />
      </InputGroupAddon>
    );
  }
}

export default SnippetInputContainer;
