import React from "react";
import {
  Input,
  InputGroup,
  Label,
  InputGroupAddon,
  FormText
} from "reactstrap";

export const renderInputGroupAddonText = ({
  input,
  label,
  addon,
  helpText,
  meta: { error, touch },
  ...attr
}) => (
  <div>
    <Label>{label}</Label>
    <InputGroup>
      <InputGroupAddon>{addon}</InputGroupAddon>
      <Input {...input} {...attr} />
    </InputGroup>
    <FormText color="muted">{helpText}</FormText>
  </div>
);
