const initialState = {
  isAddUserModalOpen: false
};

export default (state = initialState, actions) => {
  switch (actions.type) {
    case "ADD_USER_MODAL_TOGGLE":
      return { ...state, isAddUserModalOpen: !state.isAddUserModalOpen };
    default:
      return state;
  }
};
