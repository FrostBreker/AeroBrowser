const { channels } = require("../../constants");
const { bookmarks } = require("../../storedData");

module.exports = {
    name: channels.UPDATE_BOOKMARK,
    once: false,
    async execute(webContents, _, data) {
        const { id, url, name } = data;
        const bookmark = bookmarks.get('bookmarks').find(b => b.id === id);

        if (bookmark) {
            if (name) {
                bookmark.name = name;
                console.log(`[✅] Bookmark (${id}) name has been updated: (${bookmark.name})`);
            }
            if (url) {
                bookmark.url = url;
                console.log(`[✅] Bookmark (${id}) url has been updated: (${bookmark.url})`);
            }
        } else {
            console.log(`[❌] Bookmark (${id}) not found`);
        }
        //Replace the old bookmark with the new one
        bookmarks.set('bookmarks', [...bookmarks.get('bookmarks').filter(b => b.id !== id), bookmark]);
    }
}