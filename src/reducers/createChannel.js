const init = {
  createChannelOpen: false,
  isSubmitting: false
};

export const createChannel = (state = init, actions) => {
  if (actions.type === "CREATE_CHANNEL_TOGGLE") {
    return { ...state, createChannelOpen: !state.createChannelOpen };
  } else if (actions.type === "TOGGLE_CREATE_CHANNEL_SUBMIT") {
    return { ...state, isSubmitting: !state.isSubmitting };
  }
  return state;
};
