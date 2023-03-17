import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { isEmpty } from '../utils'

export default function TabSystem({ tabId }) {
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)

    const [searchValue, setSearchValue] = useState("")

    const webviews = useSelector(state => state.webviewReducer)
    const [ref, setWebViewRef] = useState(null)
    const tabs = useSelector((state) => state.tabsReducer);

    useEffect(() => {
        const webViewRef = webviews.find(webview => webview.tabId === tabId)
        const tab = tabs.find((tab) => tab.id === tabId);
        if (!isEmpty(tab)) {
            if (tab.isNewTab) {
                const input = document.getElementById("searchInput");
                input.focus();
                input.select();
            }
            const input = document.getElementById("searchInput");
            document.getElementById("searchInput").addEventListener('click', () => {
                if (!input.onfocus) {
                    input.focus();
                    input.select();
                }
            })
        }

        if (webViewRef && webViewRef.webView.current) {
            const event = webViewRef.webView.current;
            setWebViewRef(webViewRef.webView.current)
            setCanGoBack(webViewRef.webView.current.canGoBack())
            setCanGoForward(webViewRef.webView.current.canGoForward())

            setSearchValue(event.getURL())

            event.addEventListener('did-navigate-in-page', (e) => {
                setSearchValue(e.url)
            })

            event.addEventListener('did-navigate', (e) => {
                setSearchValue(e.url)
            })
        }

        return () => {
            if (webViewRef && webViewRef.webView.current) {
                const event = webViewRef.webView.current;
                event.removeEventListener('did-navigate-in-page', (e) => {
                    setSearchValue(e.url)
                })
                event.removeEventListener('did-navigate', (e) => {
                    setSearchValue(e.url)
                })
            }

            if (!isEmpty(tab)) {
                const input = document.getElementById("searchInput");
                document.getElementById("searchInput").removeEventListener('click', () => {
                    if (!input.onfocus) {
                        input.focus();
                        input.select();
                    }
                })
            }
        }
    }, [webviews, tabId, tabs])

    const handleGoBack = () => {
        if (ref) {
            ref.goBack()
        }
    }

    const handleGoForward = () => {
        if (ref) {
            ref.goForward()
        }
    }

    const handleRefresh = () => {
        if (ref) {
            ref.reload()
        }
    }

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
            const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
            return searchUrl;
        }
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const url = parseURL(e.target.value)
            if (ref) {
                ref.loadURL(url)
            }
        }
    }

    return (
        <div className='tabSystem'>
            <div className="webviewFeatures">
                <div className="navigationButton">
                    <button className='backBTN' disabled={!canGoBack} onClick={() => handleGoBack()}>
                        <img src='./img/icons/caret.svg' width={20} alt="caret-left" />
                    </button>
                    <button className='nextBTN' disabled={!canGoForward} onClick={() => handleGoForward()}>
                        <img src='./img/icons/caret.svg' width={20} alt="caret-right" />
                    </button>
                    <button className='reloadBTN' onClick={() => handleRefresh()}>
                        <img src='./img/icons/reload.svg' width={20} alt="caret-right" />
                    </button>
                </div>
                <div className="searchBar">
                    <button className='favoriteBTN'>
                        <img src='./img/icons/favorite.svg' width={20} alt="favorite" />
                    </button>
                    <input type="text" onKeyDown={handleSearch} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} onClick={(e) => e} id="searchInput" />
                </div>
                <div className="utilsButtons">
                    <button className='utilsBTN'>
                        <img src='./img/icons/plus.svg' width={20} alt="plus" />
                    </button>
                    <button className='utilsBTN'>
                        <img src='./img/icons/minus.svg' width={20} alt="minus" />
                    </button>
                    <button className='utilsBTN'>
                        <img src='./img/icons/expand.svg' width={20} alt="expand" />
                    </button>

                </div>
            </div>
            <div className="bookmarks">
                <p>{tabId}</p>
            </div>
        </div>
    )
}
