import React, { Component } from "react";
import { TabContent, TabPane, Row, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import renderPasswordMatch from "components/reduxFormComponents/renderPasswordMatch";

const required = value => (value ? undefined : "Required");
const match = value => (value && value.match ? undefined : "did not match");

class PasswordTab extends Component {
  render() {
    return (
      <TabPane tabId="2">
        <form onSubmit={this.props.handleSubmit}>
          <Field
            type="password"
            label="Old Password"
            name="oldPassword"
            for="oldPassword"
            component={renderInputText}
            validate={[required]}
          />
          <Field
            name="newPassword"
            component={renderPasswordMatch}
            validate={[match]}
          />
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </form>
      </TabPane>
    );
  }
}

PasswordTab.defaultProps = {
  onSubmit: () => {}
};

export default reduxForm({ form: "profilePassword" })(PasswordTab);
