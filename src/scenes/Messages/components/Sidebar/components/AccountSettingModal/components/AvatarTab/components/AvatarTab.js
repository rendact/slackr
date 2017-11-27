import React, { Component } from "react";
import image from "images/dummy-profile.png";
import ImageInput from "components/ImageInput";

import { TabPane, Button, ButtonGroup, Label } from "reactstrap";

class AvatarTab extends Component {
  render() {
    const {
      submitting,
      onUpdateClick,
      onResetClick,
      onImageClick
    } = this.props;
    return (
      <TabPane tabId="3">
        <div>
          <Label>Profile Picture</Label>
          <ImageInput onClick={onImageClick} disabled={submitting} />
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
  onImageClick: () => {},
  onUpdateClick: () => {},
  onResetClick: () => {}
};

export default AvatarTab;
