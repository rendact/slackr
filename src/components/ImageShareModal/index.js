import React from "react";
import { reduxForm, Field } from "redux-form";
import {
  FormGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "reactstrap";
import myUserId from "constans/myUserId";

class ImageShareModal extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      imageUrl,
      isOpen,
      onCancel,
      toggle,
      channels
    } = this.props;
    let channelList;

    if (channels.viewer) {
      channelList = channels.viewer.allChannels.edges.map(edge => {
        if (edge.node.type !== "direct") {
          return {
            id: edge.node.id,
            name: edge.node.name,
            type: edge.node.type
          };
        }

        const splittedName = edge.node.name.split(";");
        const otherId = splittedName.find(sn => sn !== myUserId);

        const other = edge.node.participants.edges.find(
          p => p.node.id === otherId
        );

        return {
          id: edge.node.id,
          name: other.node.fullname,
          type: edge.node.type
        };
      });
    }
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Share an Image</ModalHeader>
          <ModalBody>
            <img
              src={imageUrl}
              className="img-thumbnail mx-auto d-block"
              style={{ maxWidth: 300 }}
            />
            <br />
            {this.props.title}
            <FormGroup>
              Share to :
              <Field
                component="select"
                name="channel"
                className="custom-select"
                disabled={submitting}
                style={{ marginLeft: 20 }}
              >
                <option />
                {channels.viewer ? (
                  channelList.map((channel, id) => (
                    <option value={channel.id} key={id}>
                      {channel.name}
                    </option>
                  ))
                ) : (
                  <option>no channel</option>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Field
                component="input"
                name="caption"
                type="text"
                placeholder="Caption"
                className="form-control"
                disabled={submitting}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary" disabled={submitting}>
              {submitting ? <span className="fa fa-spinner fa-spin" /> : "Send"}
            </button>
            <button
              onClick={onCancel}
              disabled={submitting}
              className="btn btn-warning"
            >
              Cancel
            </button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default reduxForm({ form: "imageShareModal" })(ImageShareModal);
