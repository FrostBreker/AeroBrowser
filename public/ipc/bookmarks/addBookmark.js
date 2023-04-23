const { channels } = require("../../constants");
const { bookmarks } = require("../../storedData");

module.exports = {
    name: channels.ADD_BOOKMARK,
    once: false,
    async execute(webContents, _, data) {
        bookmarks.set('bookmarks', [...bookmarks.get('bookmarks'), data]);
    }
}