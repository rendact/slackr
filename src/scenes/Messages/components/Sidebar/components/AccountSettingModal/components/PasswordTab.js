import React, { Component } from "react";
import { TabContent, TabPane, Row, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import renderPasswordMatch from "components/reduxFormComponents/renderPasswordMatch";

class PasswordTab extends Component {
  render() {
    return (
      <TabPane tabId="2">
        <Field
          type="password"
          label="Old Password"
          name="oldPassword"
          placeholder="enter your old password"
          for="oldPassword"
          component={renderInputText}
        />
        <Field
          name="newPassword"
          component={renderPasswordMatch}
          validate={val =>
            (val && val.match) || val ? undefined : "Password not match"}
        />
      </TabPane>
    );
  }
}

export default reduxForm({ name: "profilePassword" })(PasswordTab);
