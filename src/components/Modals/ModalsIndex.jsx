import React from 'react'
import UpdateBookmarkModal from './UpdateBookmarkModal'

export default function ModalIndex({ showModals, handleShowModals, type, data }) {
  return (
    <div className='modal' style={{ display: showModals ? 'flex' : 'none' }}>
      {
        type === 'updateBookmark' ? <UpdateBookmarkModal bookmark={data} handleShowModals={handleShowModals} /> : null
      }
    </div>
  )
}
