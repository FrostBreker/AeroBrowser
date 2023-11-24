import { ADD_DOWNLOADS, GET_DOWNLOADS, REMOVE_DOWNLOADS, UPDATE_DOWNLOADS } from '../actions/downloads.actions.js'

const initialState = []

export default function downloadsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_DOWNLOADS:
      return action.payload
    case ADD_DOWNLOADS:
      return [...state, action.payload]
    case REMOVE_DOWNLOADS:
      const removed = state.filter((dl) => dl.id !== action.payload)
      return [...removed]
    case UPDATE_DOWNLOADS:
      const data = state.find((dl) => dl.id === action.payload.id)
      data.dlData = action.payload.dlData
      data.data = action.payload.data
      data.state = action.payload.state
      return [...state]
    default:
      return state
  }
}
