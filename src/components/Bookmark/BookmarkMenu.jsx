import React from 'react'
import AddBookmarkButton from '../Buttons/AddBookmarkButton'
import BookmarkItem from './BookmarkItem';
import { useSelector } from 'react-redux';

export default function BookmarkMenu({ showBookmarksMenu }) {
    const bookmarks = useSelector(state => state.bookmarksReducer);

    return (
        <div className='bookmarksMenu' style={{ display: showBookmarksMenu ? "flex" : "none" }}>
            <AddBookmarkButton />
            {
                bookmarks.map((bookmark, index) => {
                    return (<BookmarkItem key={index} book={bookmark} />)
                })
            }
        </div>
    )
}
