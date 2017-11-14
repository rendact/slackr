const init = {
  createChannelOpen: false
};
export const createChannel = (state = init, actions) => {
  if (actions.type === "CREATE_CHANNEL_TOGGLE") {
    return { ...state, createChannelOpen: !state.createChannelOpen };
  }
  return state;
};
