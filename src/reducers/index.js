import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { createChannel } from "./createChannel";

export default combineReducers({
  form: formReducer,
  createChannel
});
