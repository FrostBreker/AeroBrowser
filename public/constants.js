const path = require('path')
const os = require('os')

module.exports = {
  channels: {
    // Tabs
    RELOAD_TAB: 'RELOAD_TAB',
    BACK_IN_TAB: 'BACK_IN_TAB',
    PREVIOUS_IN_TAB: 'PREVIOUS_IN_TAB',
    SEARCH_IN_TAB: 'SEARCH_IN_TAB',
    OPEN_URL_IN_NEW_TAB: 'OPEN_URL_IN_NEW_TAB',
    OPEN_DEVTOOLS: 'OPEN_DEVTOOLS',
    LOAD_URL: 'LOAD_URL',
    LOAD_URL_IN_NEW_TAB: 'LOAD_URL_IN_NEW_TAB',
    // Bookmarks
    ADD_BOOKMARK: 'ADD_BOOKMARK',
    REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
    UPDATE_BOOKMARK: 'UPDATE_BOOKMARK',
    GET_BOOKMARKS: 'GET_BOOKMARKS',
    // Downloads
    GET_DOWNLOADS: 'GET_DOWNLOADS',
    ADD_DOWNLOAD: 'ADD_DOWNLOAD',
    REMOVE_DOWNLOAD: 'REMOVE_DOWNLOAD',
    UPDATE_DOWNLOAD: 'UPDATE_DOWNLOAD'
  },
  folders: {
    logsFolder: path.join(os.homedir(), '.aero', 'logs')
  }
}
