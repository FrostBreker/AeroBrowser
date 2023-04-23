import { combineReducers } from "redux";
import tabsReducer from "./tabs.reducer";
import bookmarksReducer from "./bookmarks.reducer";


export default combineReducers({
  tabsReducer,
  bookmarksReducer
});
