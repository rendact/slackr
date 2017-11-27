import React, { Component } from "react";
import image from "images/dummy-profile.png";
import { Media, Label, TabContent, TabPane, Row, Col } from "reactstrap";

class AvatarTab extends Component {
  render() {
    return (
      <TabPane tabId="3">
        <div>
          <Label>Profile Picture</Label>
          <Media
            object
            src={image}
            className="img-thumbnail"
            style={{ display: "block", width: 100, cursor: "pointer" }}
          />
          <input
            ref={input => {
              this.file = input;
            }}
            type="file"
            style={{ visibility: "hidden", height: 0, width: 0 }}
          />
        </div>
      </TabPane>
    );
  }
}

export default AvatarTab;
