const initial = { createDmIsOpen: false };

export default (state = initial, actions) => {
  switch (actions.type) {
    case "TOGGLE_DM_USER_LIST":
      return { ...state, createDmIsOpen: !state.createDmIsOpen };
    default:
      return state;
  }
};
