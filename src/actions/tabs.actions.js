import { generateId } from "../components/utils";

export const GET_TABS = "GET_TABS";
export const ADD_TAB = "ADD_TAB";
export const TAB_CLICK = "TAB_CLICK";
export const REMOVE_TAB = "REMOVE_TAB";
export const UPDATE_NEW_TAB_PARAMETER = "UPDATE_NEW_TAB_PARAMETER";
export const UPDATE_URL = "UPDATE_URL";
export const TOGGLE_WEBVIEW = "TOGGLE_WEBVIEW";
export const ADD_WEBVIEW = "ADD_WEBVIEW";
export const UPDATE_FAVICON = "UPDATE_FAVICON";

export const addTab = (url, isActive, isWebview) => {
    const newTab = { id: generateId(), isActive, title: "New Tab", favicon: "./favicon.ico", defaultUrl: url, isNewTab: true, isWebview, webview: null, url: "" };
    return (dispatch) => {
        dispatch({
            type: ADD_TAB,
            payload: newTab,
        });
    };
};

export const tabClick = (tabId) => {
    return (dispatch) => {
        dispatch({
            type: TAB_CLICK,
            payload: tabId,
        });
    };
};

export const removeTab = (tabId) => {
    return (dispatch) => {
        dispatch({
            type: REMOVE_TAB,
            payload: tabId,
        });
    };
};

export const updateURL = (tabId, newUrl) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_URL,
            payload: {
                tabId,
                url: newUrl,
            },
        });
    };
};

export const toggleWebview = (tabId, value) => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_WEBVIEW,
            payload: {
                tabId,
                value,
            },
        });
    };
};

export const addWebview = (tabId, webview) => {
    return (dispatch) => {
        dispatch({
            type: ADD_WEBVIEW,
            payload: {
                tabId,
                webview,
            },
        });
    };
};

export const updateFavicon = (tabId, favicon) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_FAVICON,
            payload: {
                tabId,
                favicon,
            },
        });
    };
}

