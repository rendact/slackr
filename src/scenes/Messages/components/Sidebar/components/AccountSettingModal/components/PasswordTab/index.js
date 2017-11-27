import React, { Component } from "react";
import PasswordTab from "./components/PasswordTab";
import { graphql } from "react-apollo";
import { changeUserPassword } from "./queries/changeUserPassword";

class PasswordTabWithMutation extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(val) {
    debugger;
  }
  render() {
    return (
      <PasswordTab {...this.props} {...this.context} onSubmit={this.onSubmit} />
    );
  }
}

export default graphql(changeUserPassword, { name: "changeUserPassword" })(
  PasswordTabWithMutation
);
