import { GET_WEBVIEW } from "../actions/webview.actions";

const initialState = [];

export default function webviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEBVIEW:
      if (state.find((item) => item.tabId === action.payload.tabId)) {
        return state.map((item) => {
          if (item.tabId === action.payload.tabId) {
            return {
              ...item,
              webView: action.payload.webView,
              isLoaded: action.payload.isLoaded,
            };
          }
          return item;
        });
      } else {
        return [
          ...state,
          {
            webView: action.payload.webView,
            isLoaded: action.payload.isLoaded,
            tabId: action.payload.tabId,
          },
        ];
      }
    default:
      return state;
  }
}
