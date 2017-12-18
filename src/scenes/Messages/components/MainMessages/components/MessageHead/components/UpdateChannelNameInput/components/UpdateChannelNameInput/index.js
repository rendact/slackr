import React from "react";
import { reduxForm, Field } from "redux-form";

const NameInput = ({
  spanIcon,
  submitting,
  isVisible,
  handleSubmit,
  onCancelClick
}) => (
  <form
    style={{ width: "50%", display: isVisible ? "" : "none" }}
    className="input-group"
    onSubmit={handleSubmit}
  >
    <span className="input-group-addon">
      <i className={spanIcon} />
    </span>
    <Field
      component="input"
      className="form-control"
      type="text"
      name="name"
      disabled={submitting}
    />
    <span className="input-group-btn">
      <button className="btn btn-primary" disabled={submitting}>
        {submitting ? <span className="fa fa-spinner fa-spin" /> : "Update"}
      </button>
    </span>
    <span className="input-group-btn">
      <button
        onClick={onCancelClick}
        className="btn btn-warning"
        disabled={submitting}
      >
        Cancel
      </button>
    </span>
  </form>
);

export default reduxForm({ form: "updateChannelName" })(NameInput);
