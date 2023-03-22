export const GET_BOOKMARKS = 'GET_BOOKMARKS';
export const ADD_BOOKMARK = 'ADD_BOOKMARK';
export const DELETE_BOOKMARK = 'DELETE_BOOKMARK';

export const getBookmarks = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_BOOKMARKS,
            payload: data,
        });
    };
};

export const addBookmark = ({ name, url, favicon, type, folder }) => {
    return (dispatch) => {
        dispatch({
            type: ADD_BOOKMARK,
            payload: { name, url, favicon, type, folder },
        });
    };
}

export const deleteBookmark = (id) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_BOOKMARK,
            payload: id,
        });
    };
}
