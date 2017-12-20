import React, { Component } from "react";
import { graphql } from "react-apollo";
import { highlightAuto } from "highlightjs";
import { createMessageMtn as createMessage } from "../../queries/Message/create";
import { InputGroupAddon } from "reactstrap";
import SnippetInputModal from "./components/SnippetInputModal";

class SnippetInputContainer extends Component {
  constructor(props) {
    super(props);

    this.snippetInputModalToggle = this.snippetInputModalToggle.bind(this);
    this.onSnippetSubmit = this.onSnippetSubmit.bind(this);

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
    let { title, lang, snippet: code, caption } = val;

    if (!lang || lang === "Auto Detect") {
      lang = highlightAuto(code).language;
    }

    return new Promise((resolve, reject) => {
      this.props
        .createMessage({
          variables: {
            input: {
              channelId: this.props.channelId,
              authorId: localStorage.getItem("slackrUserId"),
              content: caption,
              snippet: {
                title: title,
                code: code,
                lang: lang
              }
            }
          }
        })
        .then(data => {
          this.snippetInputModalToggle();
          resolve(data);
        })
        .catch(error => {
          this.snippetInputModalToggle();
          reject(error);
        });
    });
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

export default graphql(createMessage, { name: "createMessage" })(
  SnippetInputContainer
);
