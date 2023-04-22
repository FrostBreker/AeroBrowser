import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addWebview, toggleWebview } from '../../actions/tabs.actions';

const WebView = ({ tabId, defaultURL }) => {
    const webviewRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        webviewRef.current.addEventListener('dom-ready', () => {
            dispatch(addWebview(tabId, webviewRef.current));
            dispatch(toggleWebview(tabId, true));
        }, { once: true });
    }, [dispatch, tabId]);

    return (
        <webview
            ref={webviewRef}
            src={defaultURL}
            className='webview'
            plugins="true"
            allowpopups="true"
            key={tabId}
        ></webview>
    );
};

export default WebView;