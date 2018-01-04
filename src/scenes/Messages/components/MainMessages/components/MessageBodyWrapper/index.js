import React, { Component } from "react";

export default class ChatBody extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function(event) { 
      document
        .getElementById("input-wrapper")
        .scrollIntoView({ behavior: "smooth" });
      document.getElementById("theLast").scrollIntoView({ behavior: "smooth" });
    });    
  }
  componentDidUpdate() {
    document
      .getElementById("input-wrapper")
      .scrollIntoView({ behavior: "smooth" });
    document.getElementById("theLast").scrollIntoView({ behavior: "smooth" });
  }
  render() {
    return (
      <div
        className="chat-content"
      >
        {this.props.children}
        <div id="theLast" />
      </div>
    );
  }
}
