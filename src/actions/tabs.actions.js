export const GET_TABS = "GET_TABS";
export const ADD_TAB = "ADD_TAB";
export const TAB_CLICK = "TAB_CLICK";
export const REMOVE_TAB = "REMOVE_TAB";
export const UPDATE_NEW_TAB_PARAMETER = "UPDATE_NEW_TAB_PARAMETER";

let nextTabId = 0;

export const setupTabs = (url) => {
    const newTab = { id: nextTabId, isActive: true, title: "New Tab", favicon: null, defaultUrl: url, isNewTab: true };
    return (dispatch) => {
        dispatch({
            type: GET_TABS,
            payload: newTab,
        });
        nextTabId++;
    };
};

export const addTab = (url, isActive) => {
    const newTab = { id: nextTabId, isActive: isActive, title: "New Tab", favicon: null, defaultUrl: url, isNewTab: true };
    return (dispatch) => {
        dispatch({
            type: ADD_TAB,
            payload: newTab,
        });
        nextTabId++;
    };
}

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
}

export const updateNewTabParameter = (tabId, isNewTab) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_NEW_TAB_PARAMETER,
            payload: { tabId, isNewTab },
        });
    };
};

