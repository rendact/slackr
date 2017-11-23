import React from "react";
import PasswordMatchInput from "../PasswordMatchInput";

export default ({ input, meta, ...attr }) => (
  <PasswordMatchInput onConfirmedChange={input.onChange} />
);
