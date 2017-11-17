import React, { Component } from "react";
import { graphql } from "react-apollo";
import ButtonJoin from "../components/ButtonJoin";
import { bindUserChannel } from "../queries/bindUserChannel";
import { getChannel } from "../queries/getChannel";

class ButtonJoinMutation extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props
      .bindUserChannel({
        variables: {
          input: {
            userId: localStorage.getItem("slackrUserId"),
            channelId: this.props.channelId
          }
        },
        refetchQueries: [
          {
            query: getChannel,
            variables: { id: this.props.channelId }
          }
        ]
      })
      .then(({ data }) => {
        debugger;
      })
      .catch(({ error }) => {
        debugger;
      });
  }

  render() {
    return (
      <ButtonJoin onClick={this.onClick} isVisible={this.props.isVisible} />
    );
  }
}

export default graphql(bindUserChannel, { name: "bindUserChannel" })(
  ButtonJoinMutation
);
