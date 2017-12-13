import React from "react";
import AddUserButton from "./components/AddUserButton";

class AddUserButtonContainer extends React.Component {
  render() {
    const { isRight } = this.props;
    return <AddUserButton isRight={isRight} />;
  }
}

export default AddUserButtonContainer;
