const path = require('path');
const os = require('os');

module.exports = {
    channels: {
        //Tabs
        RELOAD_TAB: 'RELOAD_TAB',
        BACK_IN_TAB: 'BACK_IN_TAB',
        PREVIOUS_IN_TAB: 'PREVIOUS_IN_TAB',
        SEARCH_IN_TAB: 'SEARCH_IN_TAB',
        OPEN_URL_IN_NEW_TAB: 'OPEN_URL_IN_NEW_TAB',
        OPEN_DEVTOOLS: 'OPEN_DEVTOOLS',
        //Bookmarks
        ADD_BOOKMARK: 'ADD_BOOKMARK',
        REMOVE_BOOKMARK: 'REMOVE_BOOKMARK',
        UPDATE_BOOKMARK: 'UPDATE_BOOKMARK',
        GET_BOOKMARKS: 'GET_BOOKMARKS',
        //Extensions
        INSTALL_EXTENSION: 'INSTALL_EXTENSION',
        UNINSTALL_EXTENSION: 'UNINSTALL_EXTENSION',
        GET_EXTENSIONS: 'GET_EXTENSIONS',
    },
    folders: {
        extensionsFolder: path.join(os.homedir(), '.aero', 'extensions')
    }
};