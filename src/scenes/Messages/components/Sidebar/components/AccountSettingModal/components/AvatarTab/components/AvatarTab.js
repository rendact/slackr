import React, { Component } from "react";
import image from "images/dummy-profile.png";
import ImageInput from "components/ImageInput";

import { Alert, TabPane, Button, ButtonGroup, Label } from "reactstrap";

class AvatarTab extends Component {
  render() {
    const {
      serverError,
      requiredError,
      pristineError,
      submitting,
      onChange,
      onUpdateClick,
      initialImage,
      onResetClick,
      updateSuccess
    } = this.props;
    return (
      <TabPane tabId="3">
        <Alert isOpen={requiredError} color="danger">
          Please choose an image
        </Alert>
        <Alert isOpen={pristineError} color="danger">
          Please change the image
        </Alert>
        <Alert isOpen={serverError} color="danger">
          {serverError}
        </Alert>
        <Alert isOpen={updateSuccess} color="success">
          Avatar image update success
        </Alert>

        <div>
          <Label>Profile Picture</Label>
          <ImageInput
            initialImage={initialImage}
            onChange={onChange}
            disabled={submitting}
          />
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
