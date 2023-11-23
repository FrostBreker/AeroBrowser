import { combineReducers } from "redux";
import tabsReducer from "./tabs.reducer";
import bookmarksReducer from "./bookmarks.reducer";
import downloadsReducer from "./downloads.reducer";


export default combineReducers({
  tabsReducer,
  bookmarksReducer,
  downloadsReducer,
});
