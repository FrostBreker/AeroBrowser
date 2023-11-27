import { ADD_BOOKMARK, GET_BOOKMARKS, REMOVE_BOOKMARK, UPDATE_BOOKMARK } from '../actions/bookmark.actions.js'

const initialState = []

export default function bookmarksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKMARKS:
      return action.payload
    case ADD_BOOKMARK:
      return [...state, action.payload]
    case REMOVE_BOOKMARK:
      const removed = state.filter((tab) => { return tab.id !== action.payload })
      return [...removed]
    case UPDATE_BOOKMARK:
      state.find((book) => { return book.id === action.payload.id }).url = action.payload.url
      state.find((book) => { return book.id === action.payload.id }).name = action.payload.name
      return [...state]
    default:
      return state
  }
}
