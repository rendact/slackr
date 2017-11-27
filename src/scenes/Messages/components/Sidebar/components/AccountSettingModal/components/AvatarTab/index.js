import React, { Component } from "react";
import AvatarTab from "./components/AvatarTab";

class AvatarTabWithMutation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange(file) {
    this.setState({ ...file });
  }

  render() {
    return <AvatarTab onChange={this.onImageChange} />;
  }
}

export default AvatarTabWithMutation;
