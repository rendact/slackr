import React from "react";
import { InputGroup, Input, InputGroupButton } from "reactstrap";

export const renderInputGroupTextWithSend = ({
  input,
  label,
  meta: { error, touch },
  ...attr
}) => (
  <InputGroup>
    <Input {...input} {...attr} />
    <InputGroupButton type="submit">Send</InputGroupButton>
  </InputGroup>
);
