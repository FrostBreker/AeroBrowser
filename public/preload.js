const { contextBridge, ipcRenderer } = require('electron')
const { channels } = require('./constants')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('api', {
    //Emiters
    closeApp: () => ipcRenderer.send(channels.CLOSE_APP),
    minimizeApp: () => ipcRenderer.send(channels.MINIMIZE_APP),
    maximizeApp: () => ipcRenderer.send(channels.MAXIMIZE_APP),

    //Handlers
    onReloadTab: (callback) => ipcRenderer.on(channels.RELOAD_TAB, callback),
    onBackInTab: (callback) => ipcRenderer.on(channels.BACK_IN_TAB, callback),
    onPreviousInTab: (callback) => ipcRenderer.on(channels.PREVIOUS_IN_TAB, callback),
    onSearchInTab: (callback) => ipcRenderer.on(channels.SEARCH_IN_TAB, callback),
    onOpenUrlInNewTab: (callback) => ipcRenderer.on(channels.OPEN_URL_IN_NEW_TAB, callback),
    onCloseTab: (callback) => ipcRenderer.on(channels.CLOSE_TAB, callback),
    onOpenDevtools: (callback) => ipcRenderer.on(channels.OPEN_DEVTOOLS, callback),
    // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld("revokeApi", {
    //Emiters
    closeApp: () => ipcRenderer.removeAllListeners(channels.CLOSE_APP),
    minimizeApp: () => ipcRenderer.removeAllListeners(channels.MINIMIZE_APP),
    maximizeApp: () => ipcRenderer.removeAllListeners(channels.MAXIMIZE_APP),

    //Handlers
    onReloadTab: (callback) => ipcRenderer.removeAllListeners(channels.RELOAD_TAB),
    onBackInTab: (callback) => ipcRenderer.removeAllListeners(channels.BACK_IN_TAB),
    onPreviousInTab: (callback) => ipcRenderer.removeAllListeners(channels.PREVIOUS_IN_TAB),
    onSearchInTab: (callback) => ipcRenderer.removeAllListeners(channels.SEARCH_IN_TAB),
    onOpenUrlInNewTab: (callback) => ipcRenderer.removeAllListeners(channels.OPEN_URL_IN_NEW_TAB),
    onCloseTab: (callback) => ipcRenderer.removeAllListeners(channels.CLOSE_TAB),
    onOpenDevtools: (callback) => ipcRenderer.removeAllListeners(channels.OPEN_DEVTOOLS),
})