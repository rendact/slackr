import React, { Component } from "react";
import { connect } from "react-redux";
import { graphql, withApollo, compose } from "react-apollo";

import CreateChannelModal from "./components/CreateChannelModal";
import { createChannel } from "scenes/Messages/components/Sidebar/queries/createChannel";
import { bindUserChannel } from "./queries/bindUserChannel";
import bindUserRole from "./queries/bindUserRole";
import getAdminChannel from "./queries/getAdminChannel";
import { createChannelToggle } from "scenes/Messages/actions/createChannel";
import { toggleCreateChannelSubmit } from "./actions/toggleCreateChannelSubmit";

class CreateChannel extends Component {
  constructor(props) {
    super(props);

    this.createChannelSubmit = this.createChannelSubmit.bind(this);
  }

  createChannelSubmit(val) {
    this.props.dispatch(toggleCreateChannelSubmit());

    return new Promise((resolve, reject) => {
      const name = val.name + ";" + localStorage.getItem("slackrUserId");
      this.props
        .createChannel({
          variables: {
            input: {
              name: name,
              type: val.type
            }
          }
        })
        .then(data => {
          this.props.dispatch(toggleCreateChannelSubmit());
          /*
          this.props.dispatch(createChannelToggle());

          const processUserChannelBinding = () =>
            new Promise((resolve, reject) => {
              this.props
                .bindUserChannel({
                  variables: {
                    input: {
                      channelId: data.data.createChannel.changedChannel.id,
                      userId: localStorage.getItem("slackrUserId"),
                      memberType: "owner"
                    }
                  }
                })
                .then(data => {
                  resolve(data);
                })
                .catch(error => {
                  reject(error);
                });
            });

          const processUserRoleBinding = () =>
            new Promise((resolve, reject) => {
              this.props.client
                .query({
                  query: getAdminChannel
                })
                .then(data => {
                  const role = data.data.viewer.allRoles.edges[0];

                  if (role) {
                    this.props
                      .bindUserRole({
                        variables: {
                          roleId: role.node.id,
                          userId: localStorage.getItem("slackrUserId")
                        }
                      })
                      .then(data => {
                        resolve(data);
                      })
                      .catch(error => {
                        reject(error);
                      });
                  } else {
                    throw "no adminChannel role found";
                  }
                });
            });

          // process all promises
          let promise = [
            processUserRoleBinding,
            processUserChannelBinding
          ].reduce((prev, task) => {
            return prev.then(() => task()).catch(error => {
              debugger;
            });
          }, Promise.resolve());
          promise
            .then(() => {
              this.props.dispatch(toggleCreateChannelSubmit());
            })
            .catch(error => {
              debugger;

              this.props.dispatch(toggleCreateChannelSubmit());
            });
        */
        })
        .catch(error => {
          reject(error);
          this.props.dispatch(toggleCreateChannelSubmit());
        });
    });
  }
  render() {
    return (
      <CreateChannelModal
        createChannelOpen={this.props.createChannelOpen}
        createChannelToggle={() => this.props.dispatch(createChannelToggle())}
        createChannelSubmit={this.createChannelSubmit}
        isSubmitting={this.props.isSubmitting}
      />
    );
  }
}
const mapStateToProps = state => {
  return state.createChannel || {};
};

export default compose(
  connect(mapStateToProps),
  graphql(bindUserChannel, { name: "bindUserChannel" }),
  graphql(createChannel, { name: "createChannel" }),
  graphql(bindUserRole, { name: "bindUserRole" }),
  withApollo
)(CreateChannel);
