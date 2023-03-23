export const GET_TABS = "GET_TABS";
export const ADD_TAB = "ADD_TAB";
export const TAB_CLICK = "TAB_CLICK";
export const REMOVE_TAB = "REMOVE_TAB";
export const UPDATE_NEW_TAB_PARAMETER = "UPDATE_NEW_TAB_PARAMETER";
export const UPDATE_URL = "UPDATE_URL";

const generateId = () => {
    const list = "ABCDEFGHIJKLMNPQRSTUVWXYZ123456789";
    var res = "";
    for (var i = 0; i < 12; i++) {
        var rnd = Math.floor(Math.random() * list.length);
        res = res + list.charAt(rnd);
    }
    return res;
};

export const setupTabs = (url) => {
    const newTab = { id: generateId(), isActive: true, title: "New Tab", favicon: null, defaultUrl: url, isNewTab: true };
    return (dispatch) => {
        dispatch({
            type: GET_TABS,
            payload: newTab,
        });
    };
};

export const addTab = (url, isActive) => {
    const newTab = { id: generateId(), isActive: isActive, title: "New Tab", favicon: null, defaultUrl: url, isNewTab: true };
    return (dispatch) => {
        dispatch({
            type: ADD_TAB,
            payload: newTab,
        });
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

export const updateURL = (tabId, url) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_URL,
            payload: { tabId, url },
        });
    };
};

