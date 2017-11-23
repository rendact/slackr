import React, { Component } from "react";

export default class SidebarHead extends Component {
  render() {
    return (
      <div id="sidebar-head" onClick={this.props.onClick}>
        <div>
          <h2>{this.props.title}</h2>
          <p className="text-muted">{this.props.tagline}</p>
        </div>
        <span
          className="fa fa-chevron-down"
          style={{ float: "right", transform: "translate(0, -55px)" }}
        />
        <hr />
      </div>
    );
  }
}
