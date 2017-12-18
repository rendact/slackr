import React from "react";
import { connect } from "react-redux";
import removeUserModalToggle from "../../../../actions/removeUserModalToggle";
import RemoveUserButton from "./components/RemoveUserButton";

class RemoveUserButtonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.dispatch(removeUserModalToggle());
  }

  render() {
    const { isRight } = this.props;
    return <RemoveUserButton onClick={this.onClick} isRight={isRight} />;
  }
}

export default connect()(RemoveUserButtonContainer);
