import React from 'react';
import { useSelector } from 'react-redux';
import Router from './Router'
import BookmarkMenu from '../Bookmark/BookmarkMenu';

export default function RouterManager({ showBookmarksMenu }) {
    const tabs = useSelector(state => state.tabsReducer);

    return (
        <div className='router-manager'>
            <BookmarkMenu showBookmarksMenu={showBookmarksMenu} />
            {
                tabs.map(tab => (
                    <Router tabId={tab.id} isActive={tab.isActive} key={tab.id} tab={tab} />
                ))
            }
        </div>
    )
}
