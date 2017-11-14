import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { createChannel } from "../queries/createChannel";
import { createChannelToggle } from "../actions/createChannel";
import CreateChannelModal from "../components/CreateChannelModal";

class CreateChannel extends Component {
  constructor(props) {
    super(props);

    this.createChannelSubmit = this.createChannelSubmit.bind(this);
  }

  createChannelSubmit(val) {
    this.props
      .createChannel({
        variables: { input: { name: val.name, type: "public" } }
      })
      .then(data => {
        debugger;
      })
      .catch(error => {
        debugger;
      });
  }
  render() {
    return (
      <CreateChannelModal
        createChannelOpen={this.props.createChannelOpen}
        createChannelToggle={() => this.props.dispatch(createChannelToggle())}
        createChannelSubmit={this.createChannelSubmit}
      />
    );
  }
}
const mapStateToProps = state => state.createChannel || {};

CreateChannel = connect(mapStateToProps)(CreateChannel);

export default graphql(createChannel, { name: "createChannel" })(CreateChannel);
