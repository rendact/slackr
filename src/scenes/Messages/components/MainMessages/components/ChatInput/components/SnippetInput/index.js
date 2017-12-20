import React, { Component } from "react";
import { InputGroupAddon } from "reactstrap";
import SnippetInputModal from "./components/SnippetInputModal";

class SnippetInputContainer extends Component {
  constructor(props) {
    super(props);

    this.snippetInputModalToggle = this.snippetInputModalToggle.bind(this);

    this.state = {
      isSnippetInputModalOpen: false
    };
  }

  snippetInputModalToggle() {
    this.setState(prev => ({
      isSnippetInputModalOpen: !prev.isSnippetInputModalOpen
    }));
  }

  onSnippetSubmit(val) {
    debugger;
  }

  render() {
    return (
      <InputGroupAddon
        style={{ cursor: "pointer" }}
        onClick={this.snippetInputModalToggle}
      >
        <span className="fa fa-code" />
        <SnippetInputModal
          toggle={this.snippetInputModalToggle}
          isOpen={this.state.isSnippetInputModalOpen}
          onSubmit={this.onSnippetSubmit}
        />
      </InputGroupAddon>
    );
  }
}

export default SnippetInputContainer;
