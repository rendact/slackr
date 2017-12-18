import React from "react";
import UpdateChannelNameButton from "./UpdateChannelNameButton";

export default ({ isVisible, name, spanIcon, channelId }) => (
  <div style={{ width: "50%", display: isVisible ? "" : "none" }}>
    <span className={spanIcon} /> {name}
    <sup>
      <UpdateChannelNameButton channelId={channelId} />
    </sup>
  </div>
);
