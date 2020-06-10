import { combineReducers } from "redux";
import userReducer from "./userReducer";
import pageReducer from "./pageReducer";
import machinesReducer from "./machinesReducer";
import uxReducer from "./uxReducer";
import monitorDataReducer from "./monitorDataReducer";

export default combineReducers({
  user: userReducer,
  page: pageReducer,
  machines: machinesReducer,
  ux: uxReducer,
  monitorData: monitorDataReducer,
});
