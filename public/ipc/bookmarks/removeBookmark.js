const { channels } = require('../../constants')
const { bookmarks } = require('../../storedData')

module.exports = {
  name: channels.REMOVE_BOOKMARK,
  once: false,
  handler: false,
  execute(webContents, _, id) {
    bookmarks.set('bookmarks', bookmarks.get('bookmarks').filter((bookmark) => bookmark.id !== id))
  }
}
