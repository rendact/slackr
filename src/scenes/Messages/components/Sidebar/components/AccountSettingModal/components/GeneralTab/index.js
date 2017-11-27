import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getUser } from "scenes/Messages/components/Sidebar/queries/getUser";
import GeneralTab from "./components/GeneralTab";

class GeneralTabWithQryMtn extends Component {
  render() {
    return <GeneralTab {...this.props} {...this.context} />;
  }
}

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
})(GeneralTabWithQryMtn);
