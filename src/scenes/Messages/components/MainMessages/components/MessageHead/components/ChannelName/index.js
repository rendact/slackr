import React from "react";
import UpdateChannelNameButton from "../UpdateChannelNameButton";

export default ({
  isVisible,
  name,
  spanIcon,
  channelId,
  onChannelNameEditButtonClick,
  isChannelAdmin
}) => (
  <div style={{ width: "50%", display: isVisible ? "" : "none" }}>
    <span className={spanIcon} /> {name}
    {isChannelAdmin ? (
      <sup>
        <UpdateChannelNameButton
          channelId={channelId}
          onClick={onChannelNameEditButtonClick}
        />
      </sup>
    ) : null}
  </div>
);
