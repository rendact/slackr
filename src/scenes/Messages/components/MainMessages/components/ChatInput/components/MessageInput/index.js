import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { graphql, compose } from "react-apollo";
import {
  Form,
  InputGroup,
  InputGroupButton,
  InputGroupAddon,
  FormText
} from "reactstrap";
import ImageInputModal from "../ImageInputModal";
import { createMessageMtn } from "../../queries/Message/create";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageAddonClick = this.onImageAddonClick.bind(this);
    this.imageInputModalToggle = this.imageInputModalToggle.bind(this);
    this.onImageInputChange = this.onImageInputChange.bind(this);
    this.onImageInputSubmit = this.onImageInputSubmit.bind(this);

    this.state = {
      isImageInputModalOpen: false
    };
  }
  onSubmit(val) {
    this.props
      .onSubmit(val)
      .then(() => {
        this.props.reset();
        // by triggering this, the message body scroll to bottom
        //this.props.triggerNewMessage();
      })
      .catch(() => {
        debugger;
      });
  }

  imageInputModalToggle(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      isImageInputModalOpen: !prevState.isImageInputModalOpen
    }));
  }

  onImageInputSubmit(val) {
    this.props
      .createMessage({
        variables: {
          input: {
            authorId: localStorage.getItem("slackrUserId"),
            channelId: this.props.channelId,
            content: val.caption,
            attachment: {
              name: val.name,
              blobFieldName: "image",
              image: this.state.imageFile
            }
          }
        }
      })
      .then(data => {
        debugger;

        this.imageInputModalToggle();
      })
      .catch(error => {
        debugger;
        this.imageInputModalToggle();
      });
  }

  onImageInputChange(e) {
    const file = e.currentTarget.files[0];
    if (!file.type.match(/image\/.*/)) {
      throw new Error("not image error");
    }

    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = e => {
      this.setState(prevState => ({
        isImageInputModalOpen: !prevState.isImageInputModalOpen,
        initialValues: {
          title: file.name
        },
        imageFile: file,
        imageUrl: e.target.result
      }));
    };
  }

  onImageAddonClick(e) {
    this.input.click();
  }
  render() {
    const { isSending } = this.props;
    return (
      <div
        id="input-wrapper"
        style={{
          margin: 15
        }}
      >
        <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <InputGroup>
            <InputGroupAddon onClick={this.onImageAddonClick}>
              <span className="fa fa-file-image-o" />
              <input
                type="file"
                style={{ display: "none" }}
                ref={input => (this.input = input)}
                onChange={this.onImageInputChange}
              />
              <ImageInputModal
                isOpen={this.state.isImageInputModalOpen}
                toggle={this.imageInputModalToggle}
                imageUrl={this.state.imageUrl}
                initialValues={this.state.initialValues}
                onSubmit={this.onImageInputSubmit}
                onCancel={this.imageInputModalToggle}
              />
            </InputGroupAddon>
            <Field
              className="form-control"
              disabled={isSending}
              id="messageContent"
              name="messageContent"
              component="input"
            />
            <InputGroupButton disabled={isSending} type="submit">
              Send
            </InputGroupButton>
            {isSending && (
              <FormText
                color="muted"
                style={{ marginTop: 40, position: "absolute" }}
              >
                Sending...
              </FormText>
            )}
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default compose(
  reduxForm({ form: "message" }),
  graphql(createMessageMtn, { name: "createMessage" })
)(MessageInput);
