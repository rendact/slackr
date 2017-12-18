import React from "react";
import UpdateChannelNameButton from "../UpdateChannelNameButton";

export default ({
  isVisible,
  name,
  spanIcon,
  channelId,
  onChannelNameEditButtonClick
}) => (
  <div style={{ width: "50%", display: isVisible ? "" : "none" }}>
    <span className={spanIcon} /> {name}
    <sup>
      <UpdateChannelNameButton
        channelId={channelId}
        onClick={onChannelNameEditButtonClick}
      />
    </sup>
  </div>
);
