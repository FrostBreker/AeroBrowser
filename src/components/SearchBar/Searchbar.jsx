import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Searchbar({ tabId }) {
    const [value, setValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const userData = useSelector(state => state.userReducer);
    const webviews = useSelector(state => state.webviewReducer)


    useEffect(() => {
        const webViewRef = webviews.find(webview => webview.tabId === tabId)

        if (webViewRef && webViewRef.webView.current) {
            const event = webViewRef.webView.current;

            setValue(event.getURL())

            event.addEventListener('did-navigate-in-page', (e) => {
                setValue(e.url)
            })

            event.addEventListener('did-navigate', (e) => {
                setValue(e.url)
            })
        }

        return () => {
            if (webViewRef && webViewRef.webView.current) {
                const event = webViewRef.webView.current;
                event.removeEventListener('did-navigate-in-page', (e) => {
                    setValue(e.url)
                })
                event.removeEventListener('did-navigate', (e) => {
                    setValue(e.url)
                })
            }
        }
    }, [webviews, tabId])

    const handleFocus = () => {
        // const input = document.getElementById('searchInput');
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const parseURL = (url) => {
        if (/^[^/]+\.[^/]+$/.test(url)) {
            url = "https://" + url;
        }

        // Si l'entrée ressemble à une URL valide, naviguer vers cette URL.
        if (/^(ftp|http|https):\/\/[^ "]+$/.test(url)) {
            return url;
        } else {
            // Sinon, faire une recherche avec le moteur de recherche par défaut.
            const searchQuery = encodeURIComponent(url);
            const searchUrl = `${userData.defaultSearchEngineURL}${searchQuery}`;
            return searchUrl;
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const url = parseURL(e.target.value)
            window.api.openURL(url)
        }
    }

    const displayValue = isEditing ? value : value.replace(/(^\w+:|^)\/\//, '');

    return (
        <input type="text" onKeyDown={handleSearch} onChange={handleChange} value={displayValue} onFocus={handleFocus} onBlur={handleBlur} id="searchInput" />
    );
}