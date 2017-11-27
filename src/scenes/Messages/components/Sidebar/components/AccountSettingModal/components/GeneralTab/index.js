import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getUser } from "scenes/Messages/components/Sidebar/queries/getUser";
import { updateUser } from "./mutations/updateUser";
import GeneralTab from "./components/GeneralTab";

class GeneralTabWithQryMtn extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(val) {
    return new Promise((resolve, reject) => {
      this.props
        .updateUser({
          variables: {
            input: {
              id: localStorage.getItem("slackrUserId"),
              ...val
            }
          }
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  render() {
    return (
      <GeneralTab {...this.props} {...this.context} onSubmit={this.onSubmit} />
    );
  }
}

const withMutation = graphql(updateUser, { name: "updateUser" })(
  GeneralTabWithQryMtn
);

export default graphql(getUser, {
  options: { variables: { id: localStorage.getItem("slackrUserId") } },
  name: "User",
  props: ({ ownProps, User: { loading, getUser } }) => {
    if (loading) {
      return {
        initialValues: { fullname: "loading...", displayname: "loading..." }
      };
    }

    return {
      initialValues: {
        fullname: getUser.fullname,
        displayname: getUser.displayname
      }
    };
  }
})(withMutation);
