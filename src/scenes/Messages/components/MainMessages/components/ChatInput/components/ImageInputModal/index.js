import React from "react";
import { reduxForm, Field } from "redux-form";
import {
  FormGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "reactstrap";

class ImageInputModal extends React.Component {
  render() {
    const { handleSubmit, imageUrl, isOpen, onCancel, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Upload an Image</ModalHeader>
          <ModalBody>
            <img
              src={imageUrl}
              className="img-thumbnail mx-auto d-block"
              style={{ maxWidth: 300 }}
            />
            <Field
              type="file"
              name="image"
              style={{ display: "none" }}
              component="input"
            />
            <br />
            <FormGroup>
              <Field
                component="input"
                name="title"
                placeholder="Title"
                type="text"
                className="form-control"
              />
            </FormGroup>
            <FormGroup>
              <Field
                component="input"
                name="caption"
                type="text"
                placeholder="Caption"
                className="form-control"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary">Send</button>
            <button onClick={onCancel} className="btn btn-warning">
              Cancel
            </button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default reduxForm({ form: "imageChatInput" })(ImageInputModal);
