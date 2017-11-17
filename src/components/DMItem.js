import React, { Component } from "react";
import { Media } from "reactstrap";
import profile from "../images/dummy-profile.png";

export default class DMItem extends Component {
  render() {
    return (
      <Media
        style={{
          borderTop: "1px solid #e8e8e8",
          borderBottom: "1px solid #e8e8e8",
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        <Media left>
          <Media object src={profile} />
        </Media>
        <Media body style={{ marginLeft: 15 }}>
          <Media heading>theuser</Media>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
        </Media>
      </Media>
    );
  }
}
