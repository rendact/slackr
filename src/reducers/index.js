import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { createChannel } from "./createChannel";
import accountSetting from "./accountSetting";
import inputMessage from "./inputMessage";
import dmUserList from "./dmUserList";
import profileModal from "./profileModal";
import addUserModal from "./addUserModal";
import removeUserModal from "./removeUserModal";
import messageHead from "./messageHead";

export default combineReducers({
  form: formReducer,
  createChannel,
  profileModal,
  dmUserList,
  inputMessage,
  accountSetting,
  addUserModal,
  removeUserModal,
  messageHead
});
