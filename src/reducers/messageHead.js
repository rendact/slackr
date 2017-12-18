const initialState = {
  isChannelNameEditing: false
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "CHANNEL_NAME_EDITING_TOGGLE":
      return { ...state, isChannelNameEditing: !state.isChannelNameEditing };
    default:
      return state;
  }
};
