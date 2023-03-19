import React from 'react';

export default function BookmarkManager() {
    return (
        <div className='bookmarksManager'>Cette application utilise Chrome (v{window.versions.chrome()}), Node.js ({window.versions.node()}), et Electron ({window.versions.electron()})</div>
    )
}
