import LoginReducer from "./login-reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  login: LoginReducer,
});

export default rootReducer;
