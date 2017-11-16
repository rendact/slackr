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
  addonFaName,
  helpText,
  meta: { error, touch },
  ...attr
}) => (
  <div>
    <Label>{label}</Label>
    <InputGroup>
      <InputGroupAddon>
        <span className={"fa fa-" + addonFaName} />
      </InputGroupAddon>
      <Input {...input} {...attr} />
    </InputGroup>
    <FormText color="muted">{helpText}</FormText>
  </div>
);
