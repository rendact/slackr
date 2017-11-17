import React, { Component } from "react";
import { Button } from "reactstrap";

export default class ButtonJoin extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div
        id="button-join"
        onClick={onClick}
        style={{ visibility: this.props.isVisible ? "visible" : "hidden" }}
      >
        <Button size="lg" color="primary">
          Join
        </Button>
      </div>
    );
  }
}
