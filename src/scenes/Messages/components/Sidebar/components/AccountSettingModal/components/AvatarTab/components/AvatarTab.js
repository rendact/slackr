import React, { Component } from "react";
import image from "images/dummy-profile.png";
import ImageInput from "components/ImageInput";

import { Alert, TabPane, Button, ButtonGroup, Label } from "reactstrap";

class AvatarTab extends Component {
  render() {
    const {
      requiredError,
      submitting,
      onChange,
      onUpdateClick,
      onResetClick
    } = this.props;
    return (
      <TabPane tabId="3">
        <Alert isOpen={requiredError} color="danger">
          Please choose an image
        </Alert>
        <div>
          <Label>Profile Picture</Label>
          <ImageInput onChange={onChange} disabled={submitting} />
        </div>
        <ButtonGroup style={{ marginTop: 15 }}>
          <Button disabled={submitting} onClick={onUpdateClick} color="primary">
            Update
          </Button>
          <Button disabled={submitting} onClick={onResetClick} color="danger">
            Reset
          </Button>
        </ButtonGroup>
      </TabPane>
    );
  }
}

AvatarTab.defaultProps = {
  onUpdateClick: () => {},
  onResetClick: () => {},
  onChange: () => {}
};

export default AvatarTab;
