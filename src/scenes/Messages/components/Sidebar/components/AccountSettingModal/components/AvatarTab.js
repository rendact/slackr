import React, { Component } from "react";
import image from "images/dummy-profile.png";
import ImageInput from "components/ImageInput";

import { Media, Label, TabContent, TabPane, Row, Col } from "reactstrap";

class AvatarTab extends Component {
  render() {
    return (
      <TabPane tabId="3">
        <div>
          <Label>Profile Picture</Label>
          <ImageInput />
        </div>
      </TabPane>
    );
  }
}

export default AvatarTab;
