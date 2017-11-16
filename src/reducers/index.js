import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { createChannel } from "./createChannel";
import profileModal from "./profileModal";

export default combineReducers({
  form: formReducer,
  createChannel,
  profileModal
});
