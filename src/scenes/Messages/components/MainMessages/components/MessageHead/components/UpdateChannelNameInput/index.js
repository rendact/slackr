import React from "react";

export default props => (
  <div className="input-group" style={{ width: "50%" }}>
    <span className="input-group-addon">
      <i className={props.spanIcon} />
    </span>
    <input className="form-control" type="text" name="name" />
    <span className="input-group-btn">
      <button className="btn btn-primary">Update</button>
    </span>
  </div>
);
