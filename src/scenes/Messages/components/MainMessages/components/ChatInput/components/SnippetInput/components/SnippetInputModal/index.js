import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { listLanguages } from "highlightjs";

class SnippetInputModal extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(val) {
    return new Promise((resolve, reject) => {
      this.props
        .onSubmit(val)
        .then(data => this.props.reset())
        .catch(error => this.props.reset());
    });
  }

  render() {
    const { toggle, isOpen, handleSubmit, submitting } = this.props;
    return (
      <Modal size="lg" toggle={toggle} isOpen={isOpen}>
        <form onSubmit={handleSubmit(this.onSubmit)}>
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
                  disabled={submitting}
                />
              </div>
              <div className="col-md-4">
                <Field
                  disabled={submitting}
                  component="select"
                  name="lang"
                  className="form-control"
                >
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
                  disabled={submitting}
                />
              </div>
              <div className="col-md-12" style={{ marginTop: 10 }}>
                <Field
                  className="form-control"
                  type="text"
                  placeholder="caption"
                  name="caption"
                  disabled={submitting}
                  component="input"
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <button disabled={submitting} className="btn btn-primary">
              {submitting ? <span className="fa fa-spinner fa-spin" /> : "Send"}
            </button>
            <button
              className="btn btn-warning"
              onClick={e => {
                e.preventDefault();
                toggle();
              }}
              disabled={submitting}
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
