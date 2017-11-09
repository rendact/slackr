import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
export const renderInputText = ({
  input,
  label,
  meta: { touched, error, valid },
  children,
  for: labelFor,
  ...attr
}) => (
  <FormGroup>
    <Label for={labelFor}>{label}</Label>
    <Input {...input} {...attr} />
  </FormGroup>
);
