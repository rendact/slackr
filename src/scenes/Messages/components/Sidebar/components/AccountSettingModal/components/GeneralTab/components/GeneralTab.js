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
    debugger;
    return (
      <TabPane tabId="1">
        <form onSubmit={this.handleSubmit}>
          <Field
            type="text"
            label="Full Name"
            name="fullname"
            component={renderInputText}
          />
          <Field
            type="text"
            label="Display Name"
            name="displayname"
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

export default reduxForm({ form: "profileGeneral", enableReinitialize: true })(
  GeneralTab
);
