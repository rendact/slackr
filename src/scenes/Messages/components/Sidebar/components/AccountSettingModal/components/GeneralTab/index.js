import React, { Component } from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import { getUser } from "scenes/Messages/components/Sidebar/queries/getUser";
import { updateUser } from "./mutations/updateUser";
import GeneralTab from "./components/GeneralTab";

class GeneralTabWithQryMtn extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      updateSuccess: false
    };
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
        .then(data => {
          this.setState({ updateSuccess: true });
          resolve(data);
        })
        .catch(error => reject(error));
    });
  }

  render() {
    return (
      <GeneralTab
        {...this.props}
        updateSuccess={this.state.updateSuccess}
        {...this.context}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const withMutation = graphql(updateUser, { name: "updateUser" })(
  withRouter(GeneralTabWithQryMtn)
);

export default graphql(getUser, {
  options: props => ({
    variables: {
      id: localStorage.getItem("slackrUserId") || props.location.state.userId
    }
  }),
  name: "User",
  props: ({ ownProps, User: { loading, getUser, error } }) => {
    if (loading) {
      return {
        initialValues: { fullname: "loading...", displayname: "loading..." }
      };
    }

    if (error) {
      return alert(error);
    }

    return {
      initialValues: {
        fullname: getUser.fullname,
        displayname: getUser.displayname
      }
    };
  }
})(withMutation);
