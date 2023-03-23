import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateURL } from '../../actions/tabs.actions'
import Searchbar from '../SearchBar/Searchbar'
import { isEmpty } from '../utils'

export default function TabSystem({ tabId }) {
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoForward, setCanGoForward] = useState(false)

    const [favicon, setFavicon] = useState(null)
    const [isFavorited, setIsFavorited] = useState(false)

    const [pageLoaded, setPageLoaded] = useState(false)

    const webviews = useSelector(state => state.webviewReducer)
    const bookmarks = useSelector(state => state.bookmarksReducer)
    const [ref, setWebViewRef] = useState(null)

    const dispatch = useDispatch()


    useEffect(() => {
        const webViewRef = webviews.find(webview => webview.tabId === tabId)

        if (webViewRef && webViewRef.webView.current) {
            setWebViewRef(webViewRef.webView.current)
            setCanGoBack(webViewRef.webView.current.canGoBack())
            setCanGoForward(webViewRef.webView.current.canGoForward())

            webViewRef.webView.current.addEventListener('page-favicon-updated', (e) => {
                setFavicon(e.favicons[0])
            });

            const bookmark = bookmarks.find(bookmark => bookmark.url === webViewRef.webView.current.getURL())
            if (!isEmpty(bookmark)) {
                setIsFavorited(true)
            } else {
                setIsFavorited(false)
            }

            webViewRef.webView.current.addEventListener('did-start-loading', (e) => {
                setPageLoaded(false)
                const bookmark = bookmarks.find(bookmark => bookmark.url === webViewRef.webView.current.getURL())
                if (!isEmpty(bookmark)) {
                    setIsFavorited(true)
                } else {
                    setIsFavorited(false)
                }

            });

            webViewRef.webView.current.addEventListener('did-stop-loading', (e) => {
                setPageLoaded(true)
                dispatch(updateURL(tabId, webViewRef.webView.current.getURL()))
            });
        }

        return () => {
            if (webViewRef && webViewRef.webView.current) {
                webViewRef.webView.current.removeEventListener('page-favicon-updated', (e) => {
                    setFavicon(e.favicons[0])
                });

                webViewRef.webView.current.removeEventListener('did-start-loading', (e) => {
                    setPageLoaded(false)
                });

                webViewRef.webView.current.removeEventListener('did-stop-loading', (e) => {
                    setPageLoaded(true)
                });

            }
        }
    }, [webviews, tabId, bookmarks])


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

    const handleAddBookmark = () => {
        window.bookmarks.addBookmark({
            type: 'website',
            name: ref.getTitle(),
            favicon: favicon ? favicon : './img/icons/website.svg',
            folder: null,
            url: ref.getURL()
        })
    };

    const handlerRemoveBookmark = () => {
        window.bookmarks.removeBookmark(ref.getURL())
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
                    <button className='favoriteBTN' onClick={() => isFavorited ? handlerRemoveBookmark() : handleAddBookmark()} disabled={!pageLoaded}>
                        {
                            isFavorited ?
                                <img src='./img/icons/favorite-filled.svg' width={20} alt="favorite" />
                                :
                                <img src='./img/icons/favorite.svg' width={20} alt="favorite" />
                        }
                    </button>
                    <Searchbar tabId={tabId} />
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
        </div>
    )
}
