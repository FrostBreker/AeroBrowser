const { contextBridge, ipcRenderer } = require('electron')
const { channels } = require('./constants')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('tab', {
  onReloadTab: (callback) => ipcRenderer.on(channels.RELOAD_TAB, callback),
  onBackInTab: (callback) => ipcRenderer.on(channels.BACK_IN_TAB, callback),
  onPreviousInTab: (callback) => ipcRenderer.on(channels.PREVIOUS_IN_TAB, callback),
  onSearchInTab: (callback) => ipcRenderer.on(channels.SEARCH_IN_TAB, callback),
  onOpenUrlInNewTab: (callback) => ipcRenderer.on(channels.OPEN_URL_IN_NEW_TAB, callback),
  // onCloseTab: (callback) => ipcRenderer.on(channels.CLOSE_TAB, callback),
  onOpenDevtools: (callback) => ipcRenderer.on(channels.OPEN_DEVTOOLS, callback),
  loadURL: (url) => ipcRenderer.send(channels.LOAD_URL, url),
  loadURLNewTab: (url) => ipcRenderer.send(channels.LOAD_URL_IN_NEW_TAB, url),
  onLoadURL: (callback) => ipcRenderer.on(channels.LOAD_URL, callback),
  onLoadURLInNewTab: (callback) => ipcRenderer.on(channels.LOAD_URL_IN_NEW_TAB, callback)
})

contextBridge.exposeInMainWorld('revokedTab', {
  onReloadTab: () => ipcRenderer.removeAllListeners(channels.RELOAD_TAB),
  onBackInTab: () => ipcRenderer.removeAllListeners(channels.BACK_IN_TAB),
  onPreviousInTab: () => ipcRenderer.removeAllListeners(channels.PREVIOUS_IN_TAB),
  onSearchInTab: () => ipcRenderer.removeAllListeners(channels.SEARCH_IN_TAB),
  onOpenUrlInNewTab: () => ipcRenderer.removeAllListeners(channels.OPEN_URL_IN_NEW_TAB),
  // onCloseTab: () => ipcRenderer.removeAllListeners(channels.CLOSE_TAB),
  onOpenDevtools: () => ipcRenderer.removeAllListeners(channels.OPEN_DEVTOOLS),
  onLoadURL: () => ipcRenderer.removeAllListeners(channels.LOAD_URL),
  onLoadURLInNewTab: () => ipcRenderer.removeAllListeners(channels.LOAD_URL_IN_NEW_TAB)
})

contextBridge.exposeInMainWorld('bookmarks', {
  // Emiters
  addBookmark: (bookmark) => ipcRenderer.send(channels.ADD_BOOKMARK, bookmark),
  removeBookmark: (bookmark) => ipcRenderer.send(channels.REMOVE_BOOKMARK, bookmark),
  updateBookmark: (bookmark) => ipcRenderer.send(channels.UPDATE_BOOKMARK, bookmark),

  // Handlers
  onGetBookmarks: (callback) => ipcRenderer.on(channels.GET_BOOKMARKS, callback)
})

// Revoke Bookmarks API
contextBridge.exposeInMainWorld('revokedBookmarks', {
  // Handlers
  onGetBookmarks: () => ipcRenderer.removeAllListeners(channels.GET_BOOKMARKS)
})

// Downloads API
contextBridge.exposeInMainWorld('downloads', {
  getDownloads: async (count) => { const data = await ipcRenderer.invoke(channels.GET_DOWNLOADS, count); return data },
  // onGetDownloads: (callback) => ipcRenderer.on(channels.GET_DOWNLOADS, callback),
  onAddDownload: (callback) => ipcRenderer.on(channels.ADD_DOWNLOAD, callback),
  onUpdateDownload: (callback) => ipcRenderer.on(channels.UPDATE_DOWNLOAD, callback),
  removeDownload: (download) => ipcRenderer.send(channels.REMOVE_DOWNLOAD, download)
})

// Revoke Downloads API
contextBridge.exposeInMainWorld('revokedDownloads', {
  // onGetDownloads: () => ipcRenderer.removeAllListeners(channels.GET_DOWNLOADS),
  onAddDownload: () => ipcRenderer.removeAllListeners(channels.ADD_DOWNLOAD),
  onUpdateDownload: () => ipcRenderer.removeAllListeners(channels.UPDATE_DOWNLOAD)
})

// History API
// contextBridge.exposeInMainWorld('history', {
//     getHistory: () => ipcRenderer.invoke(channels.GET_HISTORY),
//     addHistory: (history) => ipcRenderer.invoke(channels.ADD_HISTORY, history),
//     removeHistory: (history) => ipcRenderer.invoke(channels.REMOVE_HISTORY, history),
//     updateHistory: (history) => ipcRenderer.invoke(channels.UPDATE_HISTORY, history),
// })

// Tabs API
// contextBridge.exposeInMainWorld('tabs', {
//     getTabs: () => ipcRenderer.invoke(channels.GET_TABS),
//     saveTabs: (tabs) => ipcRenderer.invoke(channels.SAVE_TABS, tabs),
// })
