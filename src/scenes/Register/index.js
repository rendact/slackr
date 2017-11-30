// system imports
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";

// project imports
import { register } from "./queries/Register";
import RegisterPage from "./components/RegisterPage";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: false,
      userId: null,
      isProcess: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(val) {
    return new Promise((resolve, reject) => {
      this.props
        .register({ variables: { ...val, password: val.password.value } })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  render() {
    let { success, userId } = this.state;
    let { from } = this.props.location.state || {
      from: { pathname: "/messages", state: { userId: userId } }
    };

    if (success || localStorage.getItem("slackrToken")) {
      return <Redirect to={from} />;
    }

    return (
      <RegisterPage
        isError={this.state.error}
        isProcess={this.state.isProcess}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default graphql(register, { name: "register" })(Login);
