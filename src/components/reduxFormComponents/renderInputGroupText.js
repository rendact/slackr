import React from "react";
import { InputGroup, Input, InputGroupButton, FormText } from "reactstrap";

export const renderInputGroupTextWithSend = ({
  input,
  label,
  meta: { error, touch },
  isSending,
  ...attr
}) => (
  <InputGroup>
    <Input disabled={isSending} {...input} {...attr} />
    <InputGroupButton disabled={isSending} type="submit">
      Send
    </InputGroupButton>
    {isSending && (
      <FormText color="muted" style={{ marginTop: 40, position: "absolute" }}>
        Sending...
      </FormText>
    )}
  </InputGroup>
);
