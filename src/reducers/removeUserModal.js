const initialState = {
  isRemoveUserModalOpen: false
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "REMOVE_USER_MODAL_TOGGLE":
      return { ...state, isRemoveUserModalOpen: !state.isRemoveUserModalOpen };
    default:
      return state;
  }
};
