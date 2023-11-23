const Store = require('./classes/Store');

module.exports = {
    bookmarks: new Store({
        configName: 'bookmarks',
        defaults: {
            bookmarks: []
        },
    }),
    downloads: new Store({
        configName: 'downloads',
        defaults: {
            downloads: []
        },
    }),
};