import React, { Component } from "react";
import { TabContent, TabPane, Row, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { renderInputText } from "components/reduxFormComponents/renderInputText";

class GeneralTab extends Component {
  /*
 * for user general configuration
 * i mean, that can be changed using updateUser mutation
 */

  render() {
    return (
      <TabPane tabId="1">
        <form onSubmit={this.handleSubmit}>
          <Field
            type="text"
            label="Full Name"
            placeholder="Your Full Name"
            name="fullName"
            for="fullName"
            component={renderInputText}
          />
          <Field
            type="text"
            label="Display Name"
            placeholder="The display name"
            name="displayName"
            for="displayName"
            component={renderInputText}
          />
          <input type="submit" value="Update" className="btn btn-primary" />
        </form>
      </TabPane>
    );
  }
}

GeneralTab.defaultProps = {
  onSubmit: () => {}
};

export default reduxForm({ name: "profileGeneral" })(GeneralTab);
