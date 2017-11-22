const initial = { createDmIsOpen: false, isProcessing: false };

export default (state = initial, actions) => {
  switch (actions.type) {
    case "TOGGLE_DM_USER_LIST":
      return { ...state, createDmIsOpen: !state.createDmIsOpen };
    case "TOGGLE_DM_PROCESSING":
      return { ...state, isProcessing: !state.isProcessing };
    default:
      return state;
  }
};
