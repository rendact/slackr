import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { createChannel } from "./createChannel";
import dmUserList from "./dmUserList";
import profileModal from "./profileModal";

export default combineReducers({
  form: formReducer,
  createChannel,
  profileModal,
  dmUserList
});
