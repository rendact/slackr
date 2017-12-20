import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { listLanguages } from "highlightjs";

class SnippetInputModal extends Component {
  render() {
    const { toggle, isOpen, handleSubmit } = this.props;
    return (
      <Modal size="lg" toggle={toggle} isOpen={isOpen}>
        <form onSubmit={handleSubmit}>
          <ModalHeader>Create Snippet</ModalHeader>

          <ModalBody>
            <div className="form-row">
              <div className="col-md-8">
                <Field
                  className="form-control"
                  type="text"
                  placeholder="title"
                  component="input"
                  name="title"
                />
              </div>
              <div className="col-md-4">
                <Field component="select" name="lang" className="form-control">
                  <option selected>Auto Detect</option>
                  {listLanguages().map((lang, id) => (
                    <option key={id}>{lang}</option>
                  ))}
                </Field>
              </div>
              <div className="col-md-12" style={{ marginTop: 10 }}>
                <Field
                  component="textarea"
                  name="snippet"
                  className="form-control"
                  rows="5"
                />
              </div>
              <div className="col-md-12" style={{ marginTop: 10 }}>
                <Field
                  className="form-control"
                  type="text"
                  placeholder="caption"
                  name="caption"
                  component="input"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-primary">Submit</button>
            <button
              className="btn btn-warning"
              onClick={e => {
                e.preventDefault();
                toggle();
              }}
            >
              Cancel
            </button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

export default reduxForm({ form: "snippetInput" })(SnippetInputModal);
