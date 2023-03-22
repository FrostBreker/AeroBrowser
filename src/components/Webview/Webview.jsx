import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getWebview } from '../../actions/webview.actions';

const WebView = ({ tabId }) => {
    const webviewRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const webView = webviewRef.current;
        if (webviewRef.current) {
            webView.addEventListener('load-commit', () => {
                dispatch(getWebview(webviewRef, false, tabId))
            });

            webView.addEventListener('did-finish-load', () => {
                dispatch(getWebview(webviewRef, true, tabId))
            });
        }

        return () => {
            webviewRef.current.removeEventListener('load-commit', () => {

            });

            webviewRef.current.removeEventListener('did-finish-load', () => {
            });

        }
    }, [dispatch, tabId, webviewRef]);

    return (
        <webview
            ref={webviewRef}
            src={"https://www.google.com/"}
            style={{ width: '100%', height: '91.9vh', marginTop: '108px' }}
            plugins="true"
            allowpopups="true"
        ></webview>
    );
};

export default WebView;