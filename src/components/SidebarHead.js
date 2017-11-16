import React, { Component } from "react";

export default class SidebarHead extends Component {
  render() {
    return (
      <div id="sidebar-head">
        <h2>{this.props.title}</h2>
        <p className="text-muted">{this.props.tagline}</p>
        <hr />
      </div>
    );
  }
}
