import React from "react";
import { Link } from "react-router-dom";

export default props => (
  <div>
    {props.location.state ? (
      <div>
        <h3>Register Success</h3>
        <p>Welcome {props.location.state.user},</p>
        <p>Remain one step, check your email and verify your account</p>
      </div>
    ) : (
      <Link to="/" className="btn btn-lg">
        Go to home
      </Link>
    )}
  </div>
);
