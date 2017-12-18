import React from "react";
import { graphql, compose } from "react-apollo";
import { connect } from "react-redux";

import UserListModal from "components/UserListModal";

import removeUserFromChannel from "./mutations/removeUserFromChannel";
import removeUserModalToggle from "../../actions/removeUserModalToggle";

class RemoveUserModal extends React.Component {
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
        .removeUserFromChannel({
          variables: {
            input: { userId: userId, channelId: this.props.channelId }
          }
        })
        .then(data => {
          this.setState({ isProcessing: false });
          this.props.dispatch(removeUserModalToggle());
        })
        .catch(error => {
          this.setState({ isProcessing: false });
          this.props.dispatch(removeUserModalToggle());
        });
    };
  }

  render() {
    const { users, dispatch, isRemoveUserModalOpen, participants } = this.props;

    const userItems = participants.filter(
      e => e.node.id !== localStorage.getItem("slackrUserId")
    );

    return (
      <UserListModal
        modalHeader="Remove User"
        isOpen={isRemoveUserModalOpen}
        onClick={this.onItemClick}
        isProcessing={this.state.isProcessing}
        UserItems={userItems}
        toggle={() => dispatch(removeUserModalToggle())}
      />
    );
  }
}

const mapStateToProps = state => state.removeUserModal || {};

export default compose(
  connect(mapStateToProps),
  graphql(removeUserFromChannel, { name: "removeUserFromChannel" })
)(RemoveUserModal);
