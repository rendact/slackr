import React from "react";
import { reduxForm, Field } from "redux-form";

const NameInput = props => (
  <form
    style={{ width: "50%", display: props.isVisible ? "" : "none" }}
    className="input-group"
    onSubmit={props.handleSubmit}
  >
    <span className="input-group-addon">
      <i className={props.spanIcon} />
    </span>
    <Field component="input" className="form-control" type="text" name="name" />
    <span className="input-group-btn">
      <button className="btn btn-primary">Update</button>
    </span>
    <span className="input-group-btn">
      <button onClick={props.onCancelClick} className="btn btn-warning">
        Cancel
      </button>
    </span>
  </form>
);

export default reduxForm({ form: "updateChannelName" })(NameInput);
