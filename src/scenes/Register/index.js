// system imports
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Redirect } from "react-router-dom";

// project imports
import { loginQry } from "./queries/Login";
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
    this.setState({ isProcess: true });
    this.props
      .login({
        variables: { input: { username: val.email, password: val.password } }
      })
      .then(({ data: { loginUser: { token, user: { id } } } }) => {
        localStorage.setItem("slackrToken", token);
        localStorage.setItem("slackrUserId", id);
        this.setState({
          success: true,
          error: false,
          userId: id,
          isProcess: false
        });
      })
      .catch(error => {
        this.setState({ error: true, isProcess: false });
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

export default graphql(loginQry, { name: "login" })(Login);
