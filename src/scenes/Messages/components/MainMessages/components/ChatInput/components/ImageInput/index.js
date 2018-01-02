import React from "react";
import { graphql } from "react-apollo";
import ImageInputModal from "./components/ImageInputModal";
import { InputGroupAddon } from "reactstrap";
import { createMessageMtn } from "queries/Messages/create";

class ImageInput extends React.Component {
  constructor(props) {
    super(props);
    this.onImageAddonClick = this.onImageAddonClick.bind(this);
    this.imageInputModalToggle = this.imageInputModalToggle.bind(this);
    this.onImageInputChange = this.onImageInputChange.bind(this);
    this.onImageInputSubmit = this.onImageInputSubmit.bind(this);

    this.state = {
      isImageInputModalOpen: false
    };
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
    return new Promise((resolve, reject) => {
      this.props
        .createMessage({
          variables: {
            input: {
              authorId: localStorage.getItem("slackrUserId"),
              channelId: this.props.channelId,
              content: val.caption,
              attachment: {
                name: val.title,
                blobFieldName: "image",
                image: this.state.imageFile
              }
            }
          }
        })
        .then(data => {
          resolve(data);

          this.imageInputModalToggle();
        })
        .catch(error => {
          this.imageInputModalToggle();
          reject(error);
        });
    });
  }

  onImageInputChange(e) {
    const file = e.currentTarget.files[0];
    if (!file) return;
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
    return (
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
    );
  }
}

export default graphql(createMessageMtn, { name: "createMessage" })(ImageInput);
