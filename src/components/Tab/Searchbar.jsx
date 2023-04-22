import React, { useEffect, useState } from 'react';
import { RefreshIcon, AlertIcon, LockIcon, SearchIcon } from '../UI/Icons';

export default function Searchbar({ tab }) {
    const [value, setValue] = useState('');
    const [isFocusing, setIsFocusing] = useState(false);

    useEffect(() => {
        if (tab !== null) {
            if (tab.webview !== null) {
                const w = tab.webview;
                setValue(w.getURL())
                w.addEventListener('did-navigate-in-page', (e) => {
                    setValue(e.url)
                })

                w.addEventListener('did-navigate', (e) => {
                    setValue(e.url)
                })
            }
        }
    }, [tab]);


    const handleChange = e => {
        setValue(e.target.value);
    };

    const handleFocus = e => {
        setIsFocusing(true);
        e.target.select();
    };

    const handleBlur = () => {
        setIsFocusing(false);
    };

    const handleRefresh = () => {
        tab.webview.reload();
    };

    const parseURL = (url) => {
        if (/^[^/]+\.[^/]+$/.test(url)) {
            url = "https://" + url;
        }

        // If the input looks like a valid URL, navigate to that URL.
        if (/^(ftp|http|https|file):\/\/[^ "]+$/.test(url)) {
            return url;
        } else {
            // Otherwise, perform a search with the default search engine.
            const searchQuery = encodeURIComponent(url);
            const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
            return searchUrl;
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (e.keyCode === 13) {
            setValue(parseURL(value));
            if (tab !== null) {
                if (tab.webview !== null) {
                    tab.webview.loadURL(parseURL(value));
                }
            }
        }
    };

    const GetIconToDisplay = () => {
        if (value === undefined || value === null || value === "") {
            return <AlertIcon />
        } else if (isFocusing) {
            return <SearchIcon />
        } else if (value.startsWith("https://")) {
            return <LockIcon />
        } else if (value.startsWith("file://")) {
            return <p>File</p>
        } else {
            return <AlertIcon />
        }
    }

    const displayValue = isFocusing ? value : value.replace(/(^\w+:|^)\/\//, '').split('?')[0];

    return (
        <div className='search-bar'>
            {/* Have to open a modal that display information about the security of the website */}
            <button className='sslProtocol'>
                <GetIconToDisplay />
            </button>
            <input
                type='text'
                className='search-input'
                value={displayValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={handleSubmit}
            />
            <button className='refreshButton' onClick={handleRefresh}>
                <RefreshIcon />
            </button>
        </div>
    )
}
