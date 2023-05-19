import React, { useState } from 'react'
import { CloseIcon, SoundIcon, SoundMuteIcon } from '../UI/Icons';
import { useDispatch } from 'react-redux';
import { removeTab, tabClick, updateFavicon } from '../../actions/tabs.actions';
import { useEffect } from 'react';

export default function Tab({ tab }) {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const [tabTitle, setTabTitle] = useState(tab.title);
    const [favicon, setFavicon] = useState(tab.favicon);

    const [isPlayingSound, setIsPlayingSound] = useState(false);
    const [isAudioMuted, setIsAudioMuted] = useState(false);

    const handleTabClick = (tabId) => {
        dispatch(tabClick(tabId));
    }

    const handleDeleteTab = (tabId) => {
        dispatch(removeTab(tabId))
    }

    useEffect(() => {
        if (tab) {
            if (tab.webview !== null) {
                const w = tab.webview;
                setTabTitle(w.getTitle())
                w.addEventListener('page-title-updated', (e) => {
                    setTabTitle(e.title)
                })

                w.addEventListener('page-favicon-updated', (e) => {
                    dispatch(updateFavicon(tab.id, e.favicons[0]))
                    setFavicon(e.favicons[0])
                })

                w.addEventListener('media-started-playing', () => {
                    if (w.isCurrentlyAudible()) {
                        setIsPlayingSound(true);
                    }
                    setTimeout(() => {
                        if (w.isCurrentlyAudible()) setIsPlayingSound(true);
                    }, 1000);
                });

                w.addEventListener('media-paused', () => {
                    setIsPlayingSound(false);
                });

                w.addEventListener('did-start-loading', () => {
                    setIsLoading(true);
                });

                w.addEventListener('did-stop-loading', () => {
                    setIsLoading(false);
                });
            }
        }

        return () => {
            if (tab) {
                if (tab.webview !== null) {
                    const w = tab.webview;
                    w.removeEventListener('page-title-updated', () => { });
                    w.removeEventListener('page-favicon-updated', () => { });
                    w.removeEventListener('media-started-playing', () => { });
                    w.removeEventListener('media-paused', () => { });
                    w.removeEventListener('did-start-loading', () => { });
                    w.removeEventListener('did-stop-loading', () => { });
                }
            }
        }
    }, [tab, tab.webview, isPlayingSound, dispatch])

    const handleMutedSound = (e) => {
        e.stopPropagation();
        tab.webview.setAudioMuted(!isAudioMuted);
        setIsAudioMuted(!isAudioMuted);
    }

    return (
        <div className={`tab ${tab.isActive ? "" : "inactive"}`} onClick={() => handleTabClick(tab.id)} key={tab.id} id='tab'>
            <button className="sound" onClick={handleMutedSound}>
                {
                    isPlayingSound && !isAudioMuted ? <SoundIcon /> : isPlayingSound && isAudioMuted ? <SoundMuteIcon /> : null
                }
            </button>
            {isLoading ? <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div> : <img src={favicon} alt='favicon' />}
            <p>{tabTitle}</p>
            <button className="close" onClick={(e) => { e.stopPropagation(); handleDeleteTab(tab.id) }}>
                <CloseIcon />
            </button>
        </div>
    )
}
