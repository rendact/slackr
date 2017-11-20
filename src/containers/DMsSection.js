import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import DMItem from "../components/DMItem";
import { getDMs } from "../queries/getDMs";

class DMsSection extends Component {
  renderDMs(dms) {
    return <dl>{dms.map(dm => <DMItem key={dm.node.id} {...dm.node} />)}</dl>;
  }

  render() {
    const { DM } = this.props;
    return (
      <div>
        <h4>
          <a href="#dm">Direct Messages</a>
        </h4>
        <dl>{!DM.loading && this.renderDMs(DM.viewer.allChannels.edges)}</dl>
      </div>
    );
  }
}

export default graphql(getDMs, { name: "DM" })(DMsSection);
