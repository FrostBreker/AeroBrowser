export const GET_WEBVIEW = "GET_WEBVIEW";

export const getWebview = (webView, isLoaded, tabId) => {
    return (dispatch) => {
        dispatch({
            type: GET_WEBVIEW,
            payload: {
                webView,
                isLoaded,
                tabId,
            },
        });
    };
};
