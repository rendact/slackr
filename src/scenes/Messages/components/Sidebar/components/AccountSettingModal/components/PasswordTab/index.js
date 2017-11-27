import React, { Component } from "react";
import PasswordTab from "./components/PasswordTab";
import { graphql } from "react-apollo";
import { changeUserPassword } from "./queries/changeUserPassword";

class PasswordTabWithMutation extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      submitError: false,
      errorMessage: "",
      updateSuccess: false
    };
  }

  onSubmit(val) {
    return new Promise((resolve, reject) => {
      this.props
        .changeUserPassword({
          variables: {
            input: {
              id: localStorage.getItem("slackrUserId"),
              oldPassword: val.oldPassword,
              newPassword: val.newPassword.value
            }
          }
        })
        .then(data => {
          this.setState({ updateSuccess: true, submitError: false });
          resolve(data);
        })
        .catch(error => {
          this.setState({
            submitError: true,
            updateSuccess: false,
            errorMessage: error.message
          });
          reject(error);
        });
    });
  }
  render() {
    return (
      <PasswordTab
        {...this.props}
        {...this.context}
        onSubmit={this.onSubmit}
        submitError={this.state.submitError}
        errorMessage={this.state.errorMessage}
        updateSuccess={this.state.updateSuccess}
      />
    );
  }
}

export default graphql(changeUserPassword, { name: "changeUserPassword" })(
  PasswordTabWithMutation
);
