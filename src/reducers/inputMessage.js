const initial = {
  isSending: false
};

export default (state = initial, actions) => {
  switch (actions.type) {
    case `TOGGLE_SENDING`:
      return {
        ...state,
        isSending: actions.bool ? actions.bool : !state.isSending
      };
    default:
      return state;
  }
};
