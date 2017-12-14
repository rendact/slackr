import React from "react";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

import UserListModal from "components/UserListModal";
import allUsersNotIn from "./queries/allUsersNotIn";
import addUserModalToggle from "../../actions/addUserModalToggle";
import { bindUserChannel } from "../../queries/Channel/bindUserChannel";

class AddUserModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false
    };

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(userId) {
    return e => {
      this.setState({ isProcessing: true });
      this.props
        .bindUserChannel({
          variables: {
            input: { userId: userId, channelId: this.props.channelId }
          }
        })
        .then(data => {
          this.setState({ isProcessing: false });
          this.props.dispatch(addUserModalToggle());
        })
        .catch(error => {
          this.setState({ isProcessing: false });
          this.props.dispatch(addUserModalToggle());
        });
    };
  }

  render() {
    const { users, dispatch, isAddUserModalOpen } = this.props;
    const { edges: UserItems } =
      !users.loading && users.viewer
        ? users.viewer.allUsers
        : { viewer: { allUsers: { edges: null } } };
    return (
      <UserListModal
        modalHeader="Add User"
        UserItems={UserItems}
        isOpen={isAddUserModalOpen}
        isLoading={users.loading}
        onClick={this.onItemClick}
        toggle={() => dispatch(addUserModalToggle())}
        isProcessing={this.state.isProcessing}
      />
    );
  }
}

const mapStateToProps = state => state.addUserModal || {};

export default compose(
  graphql(allUsersNotIn, {
    options: props => ({
      variables: { ids: props.participants.map(p => p.node.id) }
    }),
    name: "users"
  }),
  graphql(bindUserChannel, { name: "bindUserChannel" }),
  connect(mapStateToProps)
)(AddUserModal);
