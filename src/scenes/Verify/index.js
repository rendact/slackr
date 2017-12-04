import React, { Component } from "react";
import { graphql } from "react-apollo";
import IsProcess from "./components/isProcess";
import IsSuccess from "./components/isSuccess";
import IsError from "./components/isError";
import { verify } from "./mutations/verify";

class VerificationPage extends Component {
  constructor(props) {
    super(props);

    this.successHandler = this.successHandler.bind(this);

    this.state = {
      verifyProcess: false,
      verifySuccess: false,
      verifyError: false
    };
  }
  componentWillMount() {
    const { match, verify } = this.props;

    if (match.params.code && match.params.username) {
      this.setState({ verifyProcess: true });
      // lakukan mutasi disini
      verify({
        variables: { username: match.params.username, code: match.params.code }
      })
        .then(data => {
          this.setState({
            verifyProcess: false,
            verifySuccess: true,
            verifyError: false
          });
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            verifyProcess: false,
            verifySuccess: false,
            verifyError: true
          });
        });
    }
  }

  successHandler() {
    this.props.history.push("/login");
  }
  render() {
    return (
      <div>
        Verification page
        {this.state.verifyProcess ? <IsProcess /> : null}
        {this.state.verifySuccess ? (
          <IsSuccess onComplete={this.successHandler} />
        ) : null}
        {this.state.verifyError ? (
          <IsError errorMessage={this.state.errorMessage} />
        ) : null}
      </div>
    );
  }
}

export default graphql(verify, { name: "verify" })(VerificationPage);
