import React, { Component } from "react";

export default ({ img, author, timestamp, title, channel }) => (
  <div className="file-item-wrapper">
    <div className="actions">
      <button className="share">
        <span className="fa fa-share" />
      </button>
      <button className="delete">
        <span className="fa fa-trash" />
      </button>
    </div>
    <div className="file-item-thumb">
      <img src={img} />
    </div>
    <div className="file-item-info">
      <span className="file-item-author">{author}</span>
      <span className="file-item-timestamp">{timestamp}</span>
      <div className="file-item-title">{title}</div>
      <span className="file-item-channel">{channel}</span>
    </div>
  </div>
);
