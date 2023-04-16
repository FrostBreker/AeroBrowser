import React from 'react';
import { useSelector } from 'react-redux';
import Router from './Router'

export default function RouterManager({ showBookmarksMenu }) {
    const tabs = useSelector(state => state.tabsReducer);

    return (
        <div className='router-manager'>
            <div className='bookmarksMenu' style={{ display: showBookmarksMenu ? "flex" : "none" }}>
                <div className="bookmark">
                    <img src='https://www.google.com/favicon.ico' alt='favicon' />
                </div>
            </div>
            {
                tabs.map(tab => (
                    <Router tabId={tab.id} isActive={tab.isActive} key={tab.id} />
                ))
            }
        </div>
    )
}
