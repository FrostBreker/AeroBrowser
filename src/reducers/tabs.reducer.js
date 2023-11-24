import { GET_TABS, ADD_TAB, TAB_CLICK, REMOVE_TAB, UPDATE_NEW_TAB_PARAMETER, UPDATE_URL, TOGGLE_WEBVIEW, ADD_WEBVIEW, UPDATE_FAVICON } from '../actions/tabs.actions.js'

const initialState = []

export default function tabsReducer (state = initialState, action) {
  switch (action.type) {
    case GET_TABS:
      return [...state, action.payload]
    case ADD_TAB:
      if (action.payload.isActive) {
        if (state.length > 0) { state.find((tab) => tab.isActive).isActive = false }
      }
      return [...state, action.payload]
    case TAB_CLICK:
      state.find((tab) => tab.isActive).isActive = false
      state.find((tab) => tab.id === action.payload).isActive = true
      return [...state]
    case REMOVE_TAB:
      const data = state.filter((tab) => tab.id !== action.payload)
      if (data.length > 0) {
        data[data.length - 1].isActive = true
        return [...data]
      } else {
        return window.api.closeApp([])
      }
    case UPDATE_NEW_TAB_PARAMETER:
      state.find((tab) => tab.id === action.payload.tabId).isNewTab = action.payload.isNewTab
      return [...state]
    case UPDATE_URL:
      state.find((tab) => tab.id === action.payload.tabId).url = action.payload.url
      return [...state]
    case TOGGLE_WEBVIEW:
      state.find((tab) => tab.id === action.payload.tabId).isWebview = action.payload.value
      return [...state]
    case ADD_WEBVIEW:
      state.find((tab) => tab.id === action.payload.tabId).webview = action.payload.webview
      return [...state]
    case UPDATE_FAVICON:
      state.find((tab) => tab.id === action.payload.tabId).favicon = action.payload.favicon
      return [...state]
    default:
      return state
  }
}
