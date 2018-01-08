import React, { Component } from "react";
import classnames from "classnames";
import myUserId from "constans/myUserId";

export default ({
  onDeleteClick,
  onShareClick,
  img,
  author,
  timestamp,
  title,
  channel,
  userId,
  deleteProcess
}) => (
  <div
    disabled={deleteProcess}
    className={classnames("file-item-wrapper", { disabled: deleteProcess })}
  >
    <div
      disabled={deleteProcess}
      className={classnames("actions", { disabled: deleteProcess })}
    >
      <button onClick={onShareClick} disabled={deleteProcess} className="share">
        <span className="fa fa-share" />
      </button>

      {userId === myUserId() && (
        <button
          disabled={deleteProcess}
          onClick={onDeleteClick}
          className="delete"
        >
          <span className="fa fa-trash" />
        </button>
      )}
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
