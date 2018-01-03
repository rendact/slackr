import React from "react";
import moment from "moment";
import marked from "marked";
import ImageFullModal from "../ImageFullModal";
import myUserId from "constans/myUserId";

class ChatItemImage extends React.Component {
  constructor(props) {
    super(props);
    this.onImageToggle = this.onImageToggle.bind(this);

    this.state = {
      isImageFullModalOpen: false
    };
  }

  onImageToggle() {
    this.setState(prevState => ({
      isImageFullModalOpen: !prevState.isImageFullModalOpen
    }));
  }

  render() {
    const { title, imageUrl, caption, authorId } = this.props;
    return (
      <div className="chat-item-image">
        <div className="actions">
          <button>
            <span className="fa fa-share" />
          </button>

          {authorId === myUserId && (
            <button>
              <span className="fa fa-trash" />
            </button>
          )}
        </div>
        <p>
          Uploaded this image: <b>{title}</b>
        </p>
        <img
          className="img-thumbnail"
          src={imageUrl}
          style={{ cursor: "zoom-in", maxWidth: 300 }}
          onClick={this.onImageToggle}
        />
        <ImageFullModal
          toggle={this.onImageToggle}
          isOpen={this.state.isImageFullModalOpen}
          imageUrl={imageUrl}
          title={title}
          caption={caption}
        />
        {caption && (
          <div>
            <span
              dangerouslySetInnerHTML={{
                __html: marked(
                  ' <span class="fa fa-quote-left" style=" margin-right: 5px ;" ></span>' +
                    caption,
                  { sanitize: false }
                )
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ChatItemImage;
