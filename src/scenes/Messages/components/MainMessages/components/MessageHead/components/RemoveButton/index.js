import React, { Component } from "react";
import { graphql } from "react-apollo";

import RemoveButton from "./components/RemoveButton";
import { deleteChannel } from "./queries/Channel/delete";

class RemoveButtonContainer extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props
      .deleteChannel({ variables: { id: this.props.channelId } })
      .then(({ data }) => {
        debugger;
      })
      .catch(({ error }) => {
        debugger;
      });
  }

  render() {
    return <RemoveButton {...this.props} onClick={this.onClick} />;
  }
}

export default graphql(deleteChannel, { name: "deleteChannel" })(
  RemoveButtonContainer
);
