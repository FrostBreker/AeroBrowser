import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from './Router'
import BookmarkMenu from '../Bookmark/BookmarkMenu';
import { addTab } from '../../actions/tabs.actions';

export default function RouterManager({ showBookmarksMenu }) {
    const tabs = useSelector(state => state.tabsReducer);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        const activeTab = tabs.find(tab => tab.isActive);
        if (activeTab.webview !== null) {
            setActiveTab(activeTab);
        }
    }, [tabs])

    useEffect(() => {
        const tabAPI = window.tab;
        if (tabAPI !== undefined) {
            tabAPI.onOpenUrlInNewTab((_event, value) => {
                dispatch(addTab(value.url ? value.url : undefined, value.active, true))
            });
        }

        return () => {
            const revokeTabAPI = window.revokedTab;
            if (revokeTabAPI !== undefined) {
                revokeTabAPI.onOpenUrlInNewTab();
            }
        }

    }, [dispatch])

    const handleOpenWebsite = (url) => {
        const activeTab = tabs.find(tab => tab.isActive);
        console.log(activeTab);
        if (activeTab.webview !== null) {
            activeTab.webview.loadURL(url);
        }
    };

    const handleOpenNewTabFromBookmark = (url) => {
        dispatch(addTab(url, false, true));
    };


    return (
        <div className='router-manager'>
            <BookmarkMenu showBookmarksMenu={showBookmarksMenu} handleOpenWebsite={handleOpenWebsite} handleOpenNewTabFromBookmark={handleOpenNewTabFromBookmark} />
            {
                tabs.map(tab => (
                    <Router tabId={tab.id} isActive={tab.isActive} key={tab.id} tab={tab} />
                ))
            }
        </div>
    )
}
