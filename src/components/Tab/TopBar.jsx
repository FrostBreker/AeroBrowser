import React from 'react'
import DownloadButton from '../Buttons/DownloadButton'
import AddTabButton from '../Buttons/AddTabButton'
import { BookmarkFilledIcon, BookmarkIcon, DownTriangleCarret } from '../UI/Icons'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import WebviewController from '../Webview/WebviewController'
import Searchbar from './Searchbar'

export default function TopBar({ showBookmarksMenu, handleShowBookmarksMenu }) {
    const [activeTab, setActiveTab] = useState(null);
    const tabs = useSelector(state => state.tabsReducer);

    useEffect(() => {
        const activeTab = tabs.find(tab => tab.isActive);
        if (activeTab.webview !== null) {
            setActiveTab(activeTab);
        }
    }, [tabs])


    return (
        <div className='top-bar'>
            <div className="top-bar-left">
                {/* Utils Button */}
                <div className="utilsBTN">
                    <DownloadButton />
                    {/* Add Tab Button */}
                    <AddTabButton />
                </div>
                {/* Back and Forward buttons */}
                <WebviewController tab={activeTab} />
            </div>
            <div className='top-bar-center'>
                <Searchbar tab={activeTab} />
            </div>
            <div className='top-bar-right'>
                {/* Add modal to display Bookmarks */}
                <button className='showBookmarksBTN' onClick={handleShowBookmarksMenu}>
                    {
                        showBookmarksMenu ?
                            <BookmarkFilledIcon />
                            :
                            <BookmarkIcon />
                    }
                </button>
                {/* Button that diisplay every information and settings */}
                <button className='showInfoBTN'>
                    <DownTriangleCarret />
                </button>
            </div>
        </div>
    )
}
