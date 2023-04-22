import React, { useState } from 'react';
import TopBar from './TopBar';
import RouterManager from '../Routers/RouterManager';
import TabBars from './TabBars';

export default function TabManager() {
    const [showBookmarksMenu, setShowBookmarksMenu] = useState(false);

    const handleShowBookmarksMenu = (e) => {
        e.preventDefault();
        setShowBookmarksMenu(!showBookmarksMenu);
    }

    return (
        <div>
            <TopBar showBookmarksMenu={showBookmarksMenu} handleShowBookmarksMenu={handleShowBookmarksMenu} />
            <TabBars />
            <RouterManager showBookmarksMenu={showBookmarksMenu} />
        </div>
    )
}
