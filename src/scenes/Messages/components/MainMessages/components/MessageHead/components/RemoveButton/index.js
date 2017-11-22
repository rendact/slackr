import React, { Component } from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";

import RemoveButton from "./components/RemoveButton";
import { deleteChannel } from "./queries/Channel/delete";

class RemoveButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      isProcessing: false
    };
  }

  onClick(e) {
    this.setState({ isProcessing: true });
    this.props
      .deleteChannel({ variables: { id: this.props.channelId } })
      .then(({ data }) => {
        this.props.history.push("/messages", {
          channelId: data.deleteChannel.changedChannel.id
        });
      })
      .catch(({ error }) => {
        debugger;
      });
  }

  render() {
    return (
      <RemoveButton
        isProcessing={this.state.isProcessing}
        {...this.props}
        onClick={this.onClick}
      />
    );
  }
}

export default graphql(deleteChannel, { name: "deleteChannel" })(
  withRouter(RemoveButtonContainer)
);
