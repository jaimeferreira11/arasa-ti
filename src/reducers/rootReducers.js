import { combineReducers } from "redux";
import { authReducers } from "./authReducers";

export const rootReducers = combineReducers({
  auth: authReducers,
});
