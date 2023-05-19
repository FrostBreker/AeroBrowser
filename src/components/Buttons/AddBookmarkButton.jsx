import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddTabIcon } from '../UI/Icons';
import { addBookmark } from '../../actions/bookmark.actions';
import { generateId } from '../utils';

export default function AddBookmarkButton() {
    const [activeTab, setActiveTab] = useState(null);
    const tabs = useSelector(state => state.tabsReducer);

    const dispatch = useDispatch();


    useEffect(() => {
        const activeTab = tabs.find(tab => tab.isActive);
        if (activeTab.webview !== null) {
            setActiveTab(activeTab);
        }
    }, [tabs])

    const handleAddBookmark = (e) => {
        e.preventDefault();
        if (activeTab !== null) {
            dispatch(addBookmark({
                type: 'website',
                name: activeTab.webview.getTitle(),
                favicon: activeTab.favicon,
                folder: null,
                url: activeTab.webview.getURL(),
                id: generateId()
            }))
        }
    };

    return (
        <button className='addBookmarkButton' onClick={handleAddBookmark}>
            <AddTabIcon />
        </button>
    )
}
