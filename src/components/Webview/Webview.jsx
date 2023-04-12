import React, { useRef } from 'react';

const WebView = ({ tabId }) => {
    const webviewRef = useRef(null);

    return (
        <webview
            ref={webviewRef}
            src={"https://www.google.com/"}
            style={{ position: "fixed", top: 39, bottom: 0, left: 0, right: 0 }}
            plugins="true"
            allowpopups="true"
        ></webview>
    );
};

export default WebView;