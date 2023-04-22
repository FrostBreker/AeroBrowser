import React from 'react'
import AddBookmarkButton from '../Buttons/AddBookmarkButton'

export default function BookmarkMenu({ showBookmarksMenu }) {
    return (
        <div className='bookmarksMenu' style={{ display: showBookmarksMenu ? "flex" : "none" }}>
            <AddBookmarkButton />
            <div className="bookmark">
                <img src='https://www.google.com/favicon.ico' alt='favicon' />
            </div>
        </div>
    )
}
