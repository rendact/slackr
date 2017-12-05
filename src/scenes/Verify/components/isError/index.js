import React from "react";

export default ({ errorMessage }) => (
  <div style={{ margin: "0 auto", maxWidth: 500, color: "red" }}>
    {errorMessage}
  </div>
);
