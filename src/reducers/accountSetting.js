const initial = {
  isOpen: false
};

export default (state = initial, actions) => {
  switch (actions.type) {
    case "TOGGLE_ACCOUNT_SETTING_MODAL":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};
