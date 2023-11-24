import React from 'react'
import { ContextMenu, MenuItem, connectMenu } from 'react-contextmenu'
import { useSelector, useDispatch } from 'react-redux'
import { removeBookmark } from '../../actions/bookmark.actions'

const DynamicMenu = ({ uniqueIdentifier, handleOpenNewTabFromBookmark, handleOpenWebsite, handleShowModals }) => {
  const bookmarks = useSelector(state => state.bookmarksReducer)
  const dispatch = useDispatch()
  function handleClick (e, data) {
    const bookmarkId = uniqueIdentifier.split('-')[1]
    const book = bookmarks.find(bookmark => bookmark.id === bookmarkId)

    switch (data.type) {
      case 'openTab':
        handleOpenWebsite(book.url)
        break
      case 'openNewTab':
        handleOpenNewTabFromBookmark(book.url)
        break
      case 'update':
        handleShowModals({
          type: 'updateBookmark',
          data: book
        })
        break
      case 'delete':
        dispatch(removeBookmark(bookmarkId))
        break
      default:
        break
    }
  }

  return (
    <ContextMenu id={uniqueIdentifier}>
      <MenuItem data={{ type: 'openTab' }} onClick={handleClick}>
        Open
      </MenuItem>
      <MenuItem data={{ type: 'openNewTab' }} onClick={handleClick}>
        Open in new tab
      </MenuItem>
      <MenuItem divider />
      <MenuItem data={{ type: 'update' }} onClick={handleClick}>
        Update
      </MenuItem>
      <MenuItem data={{ type: 'delete' }} onClick={handleClick}>
        Delete
      </MenuItem>
    </ContextMenu>
  )
}

export default function ContextMenuBookmarkItem ({ uniqueIdentifier, handleOpenNewTabFromBookmark, handleOpenWebsite, handleShowModals }) {
  const ConnectedMenu = connectMenu('DYNAMIC')(DynamicMenu)

  return (
    <ConnectedMenu uniqueIdentifier={uniqueIdentifier} handleOpenNewTabFromBookmark={handleOpenNewTabFromBookmark} handleOpenWebsite={handleOpenWebsite} handleShowModals={handleShowModals} />
  )
}
