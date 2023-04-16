import React from 'react'
import DownloadButton from '../Buttons/DownloadButton'
import AddTabButton from '../Buttons/AddTabButton'
import WebviewController from '../Webview/WebviewController'
import SearchBar from './Searchbar'
import { BookmarkFilledIcon, BookmarkIcon, DownTriangleCarret } from '../UI/Icons'

export default function TopBar({ showBookmarksMenu, handleShowBookmarksMenu }) {
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
                <WebviewController />
            </div>
            <div className='top-bar-center'>
                <SearchBar />
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
