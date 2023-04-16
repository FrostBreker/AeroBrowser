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

export const addTab = (url, isActive) => {
    const newTab = { id: generateId(), isActive: isActive, title: "New Tab", favicon: "./favicon.ico", defaultUrl: url, isNewTab: true };
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

