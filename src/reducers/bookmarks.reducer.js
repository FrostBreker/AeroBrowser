import { GET_BOOKMARKS } from "../actions/bookmarks.actions";

const initialState = [];

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKMARKS:
      return action.payload;
    default:
      return state;
  }
}
