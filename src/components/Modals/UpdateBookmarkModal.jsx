import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateBookmark } from '../../actions/bookmark.actions';

export default function UpdateBookmarkModal({ bookmark, handleShowModals }) {
    const [name, setName] = useState(bookmark.name)
    const [url, setUrl] = useState(bookmark.url)

    const dispatch = useDispatch();

    const handleAddBookmark = (e) => {
        e.preventDefault();
        dispatch(updateBookmark({
            type: 'website',
            name: name ? name : bookmark.name,
            favicon: bookmark.favicon,
            folder: null,
            url: url ? url : bookmark.url,
            id: bookmark.id
        }))
        handleShowModals();
    };

    return (
        <>
            <div className="modal-overlay" onClick={handleShowModals} />
            <div className="modal-content">
                <div className="modal-content-header">
                    <h3>Update Bookmark</h3>
                </div>
                <hr></hr>
                <div className="modal-content-body">
                    <label>Name</label>
                    <input
                        type="text"
                        defaultValue={bookmark.name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>URL</label>
                    <input
                        type="text"
                        defaultValue={bookmark.url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <hr></hr>
                <div className="modal-content-footer">
                    <button className="mcf-btn-primary" onClick={handleAddBookmark}>Update</button>
                    <button className="mcf-btn-danger" onClick={handleShowModals}>Cancel</button>
                </div>
            </div>
        </>
    )
}
