const { contextBridge, ipcRenderer } = require('electron')
const { channels } = require('./constants')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

//General API
// contextBridge.exposeInMainWorld('api', {
//     //App Emiters
//     closeApp: (tabs) => ipcRenderer.send(channels.CLOSE_APP, tabs),
//     minimizeApp: () => ipcRenderer.send(channels.MINIMIZE_APP),
//     maximizeApp: () => ipcRenderer.send(channels.MAXIMIZE_APP),

//     //Webview Emiters
//     openURL: (url) => ipcRenderer.send(channels.OPEN_URL, url),
//     openUrlInNewTab: (url) => ipcRenderer.send(channels.OPEN_URL_IN_NEW_TAB, url),

//     //Webview Handlers
//     onReloadTab: (callback) => ipcRenderer.on(channels.RELOAD_TAB, callback),
//     onBackInTab: (callback) => ipcRenderer.on(channels.BACK_IN_TAB, callback),
//     onPreviousInTab: (callback) => ipcRenderer.on(channels.PREVIOUS_IN_TAB, callback),
//     onSearchInTab: (callback) => ipcRenderer.on(channels.SEARCH_IN_TAB, callback),
//     onOpenUrlInNewTab: (callback) => ipcRenderer.on(channels.OPEN_URL_IN_NEW_TAB, callback),
//     onOpenURLInRenderer: (callback) => ipcRenderer.on(channels.OPEN_URL_IN_RENDERER, callback),
//     onCloseTab: (callback) => ipcRenderer.on(channels.CLOSE_TAB, callback),
//     onOpenDevtools: (callback) => ipcRenderer.on(channels.OPEN_DEVTOOLS, callback),

//     //User Handler
//     onGetUserPreferences: (callback) => ipcRenderer.on(channels.GET_USER_PREFERENCES, callback),

//     //Tabs Handlers
//     onGetTabs: (callback) => ipcRenderer.on(channels.GET_TABS, callback)
//     // we can also expose variables, not just functions
// })

// //Revoke general API
// contextBridge.exposeInMainWorld("revokeApi", {
//     //Handlers
//     onReloadTab: () => ipcRenderer.removeAllListeners(channels.RELOAD_TAB),
//     onBackInTab: () => ipcRenderer.removeAllListeners(channels.BACK_IN_TAB),
//     onPreviousInTab: () => ipcRenderer.removeAllListeners(channels.PREVIOUS_IN_TAB),
//     onSearchInTab: () => ipcRenderer.removeAllListeners(channels.SEARCH_IN_TAB),
//     onOpenUrlInNewTab: () => ipcRenderer.removeAllListeners(channels.OPEN_URL_IN_NEW_TAB),
//     onOpenURLInRenderer: () => ipcRenderer.removeAllListeners(channels.OPEN_URL_IN_RENDERER),
//     onCloseTab: () => ipcRenderer.removeAllListeners(channels.CLOSE_TAB),
//     onOpenDevtools: () => ipcRenderer.removeAllListeners(channels.OPEN_DEVTOOLS),

//     //User Handler
//     onGetUserPreferences: () => ipcRenderer.removeAllListeners(channels.GET_USER_PREFERENCES),

//     //Tabs Handlers
//     onGetTabs: () => ipcRenderer.removeAllListeners(channels.GET_TABS),
// })

// Bookmarks API
contextBridge.exposeInMainWorld('bookmarks', {
    //Emiters
    addBookmark: (bookmark) => ipcRenderer.send(channels.ADD_BOOKMARK, bookmark),
    removeBookmark: (bookmark) => ipcRenderer.send(channels.REMOVE_BOOKMARK, bookmark),
    updateBookmark: (bookmark) => ipcRenderer.send(channels.UPDATE_BOOKMARK, bookmark),

    //Handlers
    onGetBookmarks: (callback) => ipcRenderer.on(channels.GET_BOOKMARKS, callback),
})

//Revoke Bookmarks API
contextBridge.exposeInMainWorld('revokedBookmarks', {
    //Handlers
    onGetBookmarks: () => ipcRenderer.removeAllListeners(channels.GET_BOOKMARKS),
})

// History API
// contextBridge.exposeInMainWorld('history', {
//     getHistory: () => ipcRenderer.invoke(channels.GET_HISTORY),
//     addHistory: (history) => ipcRenderer.invoke(channels.ADD_HISTORY, history),
//     removeHistory: (history) => ipcRenderer.invoke(channels.REMOVE_HISTORY, history),
//     updateHistory: (history) => ipcRenderer.invoke(channels.UPDATE_HISTORY, history),
// })

// Downloads API
// contextBridge.exposeInMainWorld('downloads', {
//     getDownloads: () => ipcRenderer.invoke(channels.GET_DOWNLOADS),
//     addDownload: (download) => ipcRenderer.invoke(channels.ADD_DOWNLOAD, download),
//     removeDownload: (download) => ipcRenderer.invoke(channels.REMOVE_DOWNLOAD, download),
//     updateDownload: (download) => ipcRenderer.invoke(channels.UPDATE_DOWNLOAD, download),
// })

// Tabs API
// contextBridge.exposeInMainWorld('tabs', {
//     getTabs: () => ipcRenderer.invoke(channels.GET_TABS),
//     saveTabs: (tabs) => ipcRenderer.invoke(channels.SAVE_TABS, tabs),
// })
