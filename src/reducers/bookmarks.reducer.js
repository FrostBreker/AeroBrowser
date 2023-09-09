import { ADD_BOOKMARK, GET_BOOKMARKS, REMOVE_BOOKMARK, UPDATE_BOOKMARK } from "../actions/bookmark.actions.js";

const initialState = [];

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKMARKS:
      return action.payload;
    case ADD_BOOKMARK:
      return [...state, action.payload];
    case REMOVE_BOOKMARK:
      const removed = state.filter((tab) => tab.id !== action.payload)
      return [...removed];
    case UPDATE_BOOKMARK:
      //Replace the old bookmark with the new one
      return [...state.filter((book) => book.id !== action.payload.id), action.payload];
    default:
      return state;
  }
}
