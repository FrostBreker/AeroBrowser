/* eslint-disable array-callback-return */
import React from 'react';
import { useSelector } from 'react-redux';
import BookmarkFolder from './BookmarkFolder';
import BookmarkItem from './BookmarkItem';

export default function BookmarkManager() {
    const bookmarks = useSelector(state => state.bookmarksReducer)
    return (
        <div className='bookmarksManager'>
            {bookmarks.map((bookmark, index) => {
                if (bookmark.type === 'folder') {
                    return <BookmarkFolder b={bookmark} key={index} />
                } else if (bookmark.type === 'website') {
                    return <BookmarkItem b={bookmark} key={index} />
                }
            })}

            {
                bookmarks.length === 0 &&
                <div className='empty'>
                    <p>There are no bookmarks yet.</p>
                </div>
            }
        </div>
    )
}
