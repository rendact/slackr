import React, { Component } from "react";
import { Alert, TabPane } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { renderInputText } from "components/reduxFormComponents/renderInputText";
import renderPasswordMatch from "components/reduxFormComponents/renderPasswordMatch";

const required = value => (value ? undefined : "Required");
const match = value => (value && value.match ? undefined : "did not match");

class PasswordTab extends Component {
  render() {
    return (
      <TabPane tabId="2">
        <Alert isOpen={this.props.submitError} color="danger">
          {this.props.errorMessage}
        </Alert>
        <Alert isOpen={this.props.updateSuccess} color="success">
          Password Updated Successfully
        </Alert>
        <form onSubmit={this.props.handleSubmit}>
          <Field
            type="password"
            label="Old Password"
            name="oldPassword"
            for="oldPassword"
            component={renderInputText}
            validate={[required]}
            disabled={this.props.submitting}
          />
          <Field
            name="newPassword"
            component={renderPasswordMatch}
            validate={[match]}
            disabled={this.props.submitting}
          />
          <button
            disabled={this.props.submitting}
            className="btn btn-primary"
            type="submit"
          >
            {this.props.submitting ? (
              <i className="fa fa-spinner fa-spin" />
            ) : (
              "Update"
            )}
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
