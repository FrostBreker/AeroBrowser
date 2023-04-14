import React, { useRef } from 'react';

const WebView = ({ tabId }) => {
    const webviewRef = useRef(null);

    return (
        <webview
            ref={webviewRef}
            src={"https://www.google.com/"}
            className='webview'
            plugins="true"
            allowpopups="true"
        ></webview>
    );
};

export default WebView;