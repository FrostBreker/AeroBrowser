import { combineReducers } from "redux";
import webviewReducer from "./webview.reducer";
import tabsReducer from "./tabs.reducer";

export default combineReducers({
  webviewReducer,
  tabsReducer
});
