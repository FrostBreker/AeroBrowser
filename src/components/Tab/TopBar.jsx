import React from 'react'
import DownloadButton from '../Buttons/DownloadButton'
import AddTabButton from '../Buttons/AddTabButton'
import WebviewController from '../Webview/WebviewController'
import SearchBar from './Searchbar'

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
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                                <path strokeWidth="5" d="M 37 48 C 36.824219 48 36.652344 47.953125 36.496094 47.863281 L 25 41.15625 L 13.503906 47.863281 C 13.195313 48.042969 12.8125 48.046875 12.503906 47.867188 C 12.191406 47.6875 12 47.359375 12 47 L 12 3 C 12 2.449219 12.449219 2 13 2 L 37 2 C 37.554688 2 38 2.449219 38 3 L 38 47 C 38 47.359375 37.808594 47.6875 37.496094 47.867188 C 37.34375 47.957031 37.171875 48 37 48 Z" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px" >
                                <path
                                    d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z" />
                            </svg>
                    }
                </button>
                {/* Button that diisplay every information and settings */}
                <button className='showInfoBTN'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px"
                        height="50px">
                        <path
                            d="M 44.988281 13.984375 C 44.726563 13.992188 44.476563 14.101563 44.292969 14.292969 L 25 33.585938 L 5.707031 14.292969 C 5.519531 14.097656 5.261719 13.992188 4.992188 13.988281 C 4.582031 13.992188 4.21875 14.238281 4.0625 14.613281 C 3.910156 14.992188 4 15.421875 4.292969 15.707031 L 24.292969 35.707031 C 24.683594 36.097656 25.316406 36.097656 25.707031 35.707031 L 45.707031 15.707031 C 46.003906 15.421875 46.09375 14.980469 45.9375 14.601563 C 45.777344 14.222656 45.402344 13.976563 44.988281 13.984375 Z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
