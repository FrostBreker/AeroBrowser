import React, { createRef } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import ContextMenuBookmarkItem from '../ContextMenu/ContextMenuBookmarkItem';

export default function BookmarkItem(props) {
    const { book, handleOpenWebsite, handleOpenNewTabFromBookmark, handleShowModals } = props;
    const { name, favicon, folder, url, id } = book;
    const buttonRef = createRef();
    const handleOpen = (e) => {
        e.preventDefault();
        handleOpenWebsite(url);
    };

    const openWebsiteInNewTab = (e) => {
        if (e.button === 1) {
            e.preventDefault();
            handleOpenNewTabFromBookmark(url);
        }
    };

    const contextMenuId = `bookmarkItem-${id}`;

    return (
        <div>
            <ContextMenuTrigger id={contextMenuId}>
                <button className="bookmark" onClick={handleOpen} ref={buttonRef} onMouseDown={openWebsiteInNewTab}>
                    <img src={favicon} alt="bookmark-favicon" />
                </button>
            </ContextMenuTrigger>
            <ContextMenuBookmarkItem
                uniqueIdentifier={contextMenuId}
                handleOpenWebsite={handleOpenWebsite}
                handleOpenNewTabFromBookmark={handleOpenNewTabFromBookmark}
                handleShowModals={handleShowModals}
            />
        </div>
    );
}