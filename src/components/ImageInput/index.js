import React, { Component } from "react";
import image from "images/dummy-profile.png";

class ImageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgOver: false,
      imgSrc: null,
      worngType: false
    };

    this.onImgOver = this.onImgOver.bind(this);
    this.onImgOut = this.onImgOut.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
  }

  onFileInputChange(e) {
    const file = e.target.files[0];
    if (["image/png", "image/jpg", "image/jpeg"].indexOf(file.type) === -1) {
      this.setState({ wrongType: true });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      this.setState({ imgSrc: dataUrl });
    };

    this.setState({ wrongType: false });
    reader.readAsDataURL(file);
    this.props.onChange({ file: file });
  }

  onClick(e) {
    this.fileInput.click();
  }

  onImgOver() {
    this.setState({ imgOver: true });
  }

  onImgOut() {
    this.setState({ imgOver: false });
  }
  render() {
    let styleHover, imgSrc;

    if (this.state.imgOver) {
      styleHover = {
        position: "relative",
        height: 100,
        width: 100,
        background: "#0000007a",
        color: "white",
        textAlign: "center",
        padding: "30px 0",
        cursor: "pointer",
        zIndex: 1
      };
    } else {
      styleHover = {
        position: "relative",
        visibility: "hidden",
        zIndex: 2,
        height: 100,
        width: 100
      };
    }

    imgSrc = this.state.imgSrc ? this.state.imgSrc : image;

    return (
      <div>
        <img
          alt=""
          className="img img-thumbnail"
          src={imgSrc}
          width="100px"
          height="100px"
          style={{
            width: 100,
            height: 100,
            cursor: "pointer",
            position: "absolute"
          }}
          onMouseOver={this.onImgOver}
          onMouseOut={this.onImgOut}
        />
        <div
          style={styleHover}
          onMouseOver={this.onImgOver}
          onMouseOut={this.onImgOut}
          onClick={this.onClick}
        >
          Upload<br /> Here
        </div>
        {this.state.wrongType && (
          <small style={{ color: "red", display: "block", padding: 5 }}>
            wrong type
          </small>
        )}
        <input
          type="file"
          style={{ visiblity: "hidden", display: "none" }}
          ref={input => {
            this.fileInput = input;
          }}
          onChange={this.onFileInputChange}
        />
      </div>
    );
  }
}

ImageInput.defaultProps = {
  onChange: () => {}
};

export default ImageInput;
