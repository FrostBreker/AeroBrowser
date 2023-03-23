import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNewTabParameter } from '../../actions/tabs.actions'
import { isEmpty } from '../utils'

export default function TabBar({ id, handleTabClick, handleCloseTab }) {
    const [favicon, setFavicon] = useState(null)
    const [isPlayingSound, setIsPlayingSound] = useState(false)
    const [soundIsMute, setSoundIsMute] = useState(false)
    const [isNewTab, setIsNewTab] = useState(true)

    const dispatch = useDispatch()

    const webviews = useSelector(state => state.webviewReducer)
    const [ref, setWebViewRef] = useState(null)
    const tabs = useSelector(state => state.tabsReducer)

    useEffect(() => {
        const webViewRef = webviews.find(webview => webview.tabId === id)
        if (webViewRef && webViewRef.webView.current) {
            setWebViewRef(webViewRef.webView.current)
            webViewRef.webView.current.addEventListener('page-favicon-updated', (e) => {
                setFavicon(e.favicons[0])
            });

            webViewRef.webView.current.addEventListener('media-started-playing', (e) => {
                if (webViewRef.webView.current.isCurrentlyAudible()) {
                    setIsPlayingSound(true)
                } else {
                    setTimeout(() => {
                        if (webViewRef.webView.current.isCurrentlyAudible()) {
                            setIsPlayingSound(true)
                        }
                    }, 1000)
                }
            });

            webViewRef.webView.current.addEventListener('media-paused', (e) => {
                setIsPlayingSound(false)
            });
        }

        return () => {
            if (webViewRef && webViewRef.webView.current) {
                webViewRef.webView.current.removeEventListener('page-favicon-updated', (e) => {
                    setFavicon(e.favicons[0])
                });

                webViewRef.webView.current.addEventListener('media-started-playing', (e) => {
                    if (webViewRef.webView.current.isCurrentlyAudible())
                        setIsPlayingSound(true)
                });

                webViewRef.webView.current.addEventListener('media-paused', (e) => {
                    setIsPlayingSound(false)
                });
            }
        }


    }, [webviews, id])

    useEffect(() => {
        const webViewRef = webviews.find(webview => webview.tabId === id);
        const tab = tabs.find((tab) => tab.id === id);
        if (!isEmpty(webViewRef) && !isEmpty(tab)) {
            if (tab.defaultUrl !== undefined && isNewTab) {
                webViewRef.webView.current.addEventListener('dom-ready', () => {
                    webViewRef.webView.current.loadURL(tab.defaultUrl)
                    dispatch(updateNewTabParameter(id, false))
                    setIsNewTab(false);
                }, { once: true });
            }

            if (tab.url !== undefined && isNewTab) {
                webViewRef.webView.current.addEventListener('dom-ready', () => {
                    webViewRef.webView.current.loadURL(tab.url)
                    dispatch(updateNewTabParameter(id, false))
                    setIsNewTab(false);
                }, { once: true });
            }
        }
    }, [id, webviews, tabs, dispatch, isNewTab])

    return (
        <div
            key={id}
            className={tabs.find((t) => t.id === id).isActive ? 'active-tab' : 'inactive-tab'}
            onClick={() => handleTabClick(id)}
        >
            <div>
                {favicon && <img src={favicon} alt="favicon" className='favicon' />}
                {isPlayingSound && <img src={soundIsMute ? './img/icons/audio-off.svg' : './img/icons/audio-on.svg'} alt="sound-mute" className='sound' onClick={() => {
                    setSoundIsMute(!soundIsMute)
                    ref.setAudioMuted(!soundIsMute)
                }} />}
                <p>{webviews && ref && ref.getTitle() ? ref.getTitle() : 'New Tab'}</p>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleCloseTab(id);
                }}
            >
                x
            </button>
        </div>
    )
}
