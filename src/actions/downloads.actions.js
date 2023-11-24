export const ADD_DOWNLOADS = 'ADD_DOWNLOADS'
export const REMOVE_DOWNLOADS = 'REMOVE_DOWNLOADS'
export const UPDATE_DOWNLOADS = 'UPDATE_DOWNLOADS'
export const GET_DOWNLOADS = 'GET_DOWNLOADS'

export const getDownloads = count => {
  return async (dispatch) => {
    const data = await window.downloads.getDownloads(count)
    dispatch({
      type: GET_DOWNLOADS,
      payload: data
    })
  }
}

export const addDownload = data => {
  return (dispatch) => {
    dispatch({
      type: ADD_DOWNLOADS,
      payload: data
    })
  }
}

export const removeDownload = id => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_DOWNLOADS,
      payload: id
    })
    window.downloads.removeDownload(id)
  }
}

export const updateDownload = data => {
  console.log(data)
  return (dispatch) => {
    dispatch({
      type: UPDATE_DOWNLOADS,
      payload: data
    })
  }
}
