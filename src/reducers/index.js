import { combineReducers } from "redux";
import webviewReducer from "./webview.reducer";
import tabsReducer from "./tabs.reducer";
import bookmarksReducer from "./bookmarks.reducer";
import userReducer from "./user.reducer";

export default combineReducers({
  webviewReducer,
  tabsReducer,
  bookmarksReducer,
  userReducer
});
