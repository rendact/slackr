// system imports
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";

// project imports
import { register } from "./queries/Register";
import RegisterPage from "./components/RegisterPage";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      errorMessage: null,
      error: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(val) {
    this.setState({ error: false, errorMessage: null, success: false });
    return new Promise((resolve, reject) => {
      this.props
        .register({ variables: { ...val, password: val.password.value } })
        .then(data => {
          resolve(data);
          this.setState({ success: true, fullName: val.fullname });
        })
        .catch(error => {
          reject(error);
          this.setState({ error: true, errorMessage: error.message });
        });
    });
  }
  render() {
    let { success, error, errorMessage, fullName } = this.state;

    if (success) {
      return (
        <Redirect
          to={{ pathname: "/register/success", state: { user: fullName } }}
        />
      );
    }

    return (
      <RegisterPage
        isError={error}
        errorMessage={errorMessage}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default graphql(register, { name: "register" })(Register);
