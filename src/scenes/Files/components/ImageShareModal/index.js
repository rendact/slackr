import React from "react";
import { reduxForm, Field } from "redux-form";
import {
  FormGroup,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "reactstrap";

class ImageShareModal extends React.Component {
  render() {
    const {
      handleSubmit,
      submitting,
      imageUrl,
      isOpen,
      onCancel,
      toggle
    } = this.props;
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
            <FormGroup>
              <Field
                component="input"
                name="title"
                placeholder="Title"
                type="text"
                className="form-control"
                disabled={submitting}
              />
            </FormGroup>
            <FormGroup>
              <Field
                component="select"
                name="channel"
                className="form-control"
                disabled={submitting}
              >
                <option />
                <option />
                <option />
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
