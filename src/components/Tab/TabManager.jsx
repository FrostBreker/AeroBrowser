import React, { useState } from 'react';
import TabBar from './TabBar';
import TopBar from './TopBar';
import RouterManager from '../Routers/RouterManager';

export default function TabManager() {
    const [showBookmarksMenu, setShowBookmarksMenu] = useState(false);

    const handleShowBookmarksMenu = (e) => {
        e.preventDefault();
        setShowBookmarksMenu(!showBookmarksMenu);
    }

    return (
        <div>
            <TopBar showBookmarksMenu={showBookmarksMenu} handleShowBookmarksMenu={handleShowBookmarksMenu} />
            <TabBar />
            <RouterManager showBookmarksMenu={showBookmarksMenu} />
        </div>
    )
}
