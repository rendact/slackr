import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql, withApollo } from "react-apollo";
import DMItem from "../components/DMItem";
import { toggleDMUserList } from "../actions/toggleDMUserList";
import { getDMs } from "../queries/getDMs";
import { getUsers } from "../queries/getUsers";
import { getUser } from "../queries/getUser";
import { dmSubscriptionOnCreate } from "../queries/DMSubscriptionOnCreate";

class DMsSection extends Component {
  constructor(props) {
    super(props);

    this.handleHeaderDMClick = this.handleHeaderDMClick.bind(this);
    this.subscribeToDM = this.subscribeToDM.bind(this);
  }

  componentWillMount() {
    this.subscribeToDM();
  }

  renderDMs(dms, client) {
    var userList = client.query({
      query: getUsers,
      variables: { id: localStorage.getItem("slackrUserId") }
    });
    return (
      <dl>
        {dms.map(dm => (
          <DMItem key={dm.node.id} {...dm.node} userList={userList} />
        ))}
      </dl>
    );
  }

  subscribeToDM() {
    const currentUserId = localStorage.getItem("slackrUserId");
    return this.props.DM.subscribeToMore({
      document: dmSubscriptionOnCreate,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        return {
          viewer: {
            allChannels: {
              edges: [
                ...prev.viewer.allChannels.edges,
                subscriptionData.data.subscribeToChannel.edge
              ]
            }
          }
        };
      }
    });
  }

  handleHeaderDMClick(e) {
    e.preventDefault();

    this.props.dispatch(toggleDMUserList());
  }

  render() {
    const { DM, client } = this.props;
    return (
      <div>
        <h4>
          <a onClick={this.handleHeaderDMClick} href="#dm">
            Direct Messages
          </a>
        </h4>
        <dl>
          {!DM.loading && this.renderDMs(DM.viewer.allChannels.edges, client)}
        </dl>
      </div>
    );
  }
}

const withRedux = connect()(DMsSection);

export default graphql(getDMs, {
  name: "DM",
  options: { variables: { userId: localStorage.getItem("slackrUserId") } }
})(withApollo(withRedux));
