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
        <form onSubmit={this.props.handleSubmit}>
          <Field
            type="text"
            label="Full Name"
            name="fullname"
            component={renderInputText}
            disabled={this.props.submitting}
          />
          <Field
            type="text"
            label="Display Name"
            name="displayname"
            component={renderInputText}
            disabled={this.props.submitting}
          />
          <button
            disabled={this.props.submitting}
            type="submit"
            className="btn btn-primary"
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

GeneralTab.defaultProps = {
  onSubmit: () => {}
};

export default reduxForm({ form: "profileGeneral", enableReinitialize: true })(
  GeneralTab
);
