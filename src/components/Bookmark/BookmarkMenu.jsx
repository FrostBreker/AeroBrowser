import React from 'react'
import AddBookmarkButton from '../Buttons/AddBookmarkButton'
import BookmarkItem from './BookmarkItem'
import { useSelector } from 'react-redux'

export default function BookmarkMenu({ showBookmarksMenu, handleOpenWebsite, handleOpenNewTabFromBookmark, handleShowModals }) {
  const bookmarks = useSelector(state => state.bookmarksReducer)

  return (
    <div className='bookmarksMenu' style={{ display: showBookmarksMenu ? 'flex' : 'none' }}>
      <AddBookmarkButton />
      {
        bookmarks.map((bookmark, index) => (
          <BookmarkItem key={bookmark.id} book={bookmark} handleOpenWebsite={handleOpenWebsite} handleOpenNewTabFromBookmark={handleOpenNewTabFromBookmark} handleShowModals={handleShowModals} />
        ))
      }
    </div>
  )
}
