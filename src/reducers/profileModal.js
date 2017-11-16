const initial = {
  profileModalOpen: false
};

export default (state = initial, actions) => {
  if (actions.type === "TOGGLE_PROFILE_MODAL") {
    return { ...state, profileModalOpen: !state.profileModalOpen };
  }
  return state;
};
