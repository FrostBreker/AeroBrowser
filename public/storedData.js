const Store = require('./classes/Store');

module.exports = {
    bookmarks: new Store({
        configName: 'bookmarks',
        defaults: {
            bookmarks: []
        },
    })
};