export const ADD_BOOKMARK = 'ADD_BOOKMARK'
export const REMOVE_BOOKMARK = 'REMOVE_BOOKMARK'
export const UPDATE_BOOKMARK = 'UPDATE_BOOKMARK'
export const GET_BOOKMARKS = 'GET_BOOKMARKS'

export const getBookmarks = data => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOKMARKS,
      payload: data
    })
  }
}

export const addBookmark = data => {
  return (dispatch) => {
    dispatch({
      type: ADD_BOOKMARK,
      payload: data
    })
    window.bookmarks.addBookmark(data)
  }
}

export const removeBookmark = id => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_BOOKMARK,
      payload: id
    })
    window.bookmarks.removeBookmark(id)
  }
}

export const updateBookmark = data => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BOOKMARK,
      payload: data
    })
    window.bookmarks.updateBookmark(data)
  }
}
