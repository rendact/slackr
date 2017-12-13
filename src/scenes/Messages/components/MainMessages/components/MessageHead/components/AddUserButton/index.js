import React from "react";
import { connect } from "react-redux";
import addUserModalToggle from "./actions/addUserModalToggle";
import AddUserButton from "./components/AddUserButton";

class AddUserButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    debugger;
    this.props.dispatch(addUserModalToggle());
  }

  render() {
    const { isRight } = this.props;
    return <AddUserButton onClick={this.onClick} isRight={isRight} />;
  }
}

export default connect()(AddUserButtonContainer);
