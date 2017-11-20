import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import DMItem from "../components/DMItem";
import { toggleDMUserList } from "../actions/toggleDMUserList";
import { getDMs } from "../queries/getDMs";

class DMsSection extends Component {
  constructor(props) {
    super(props);

    this.handleHeaderDMClick = this.handleHeaderDMClick.bind(this);
  }
  renderDMs(dms) {
    return <dl>{dms.map(dm => <DMItem key={dm.node.id} {...dm.node} />)}</dl>;
  }

  handleHeaderDMClick(e) {
    e.preventDefault();

    this.props.dispatch(toggleDMUserList());
  }

  render() {
    const { DM } = this.props;
    return (
      <div>
        <h4>
          <a onClick={this.handleHeaderDMClick} href="#dm">
            Direct Messages
          </a>
        </h4>
        <dl>{!DM.loading && this.renderDMs(DM.viewer.allChannels.edges)}</dl>
      </div>
    );
  }
}

const withRedux = connect()(DMsSection);

export default graphql(getDMs, {
  name: "DM",
  options: { variables: { userId: localStorage.getItem("slackrUserId") } }
})(withRedux);
