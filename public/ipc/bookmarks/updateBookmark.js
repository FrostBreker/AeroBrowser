const { channels } = require('../../constants')
const { bookmarks } = require('../../storedData')

module.exports = {
  name: channels.UPDATE_BOOKMARK,
  once: false,
  handler: false,
  async execute (webContents, _, data) {
    const { id, url, name } = data
    const bookmarksData = bookmarks.get('bookmarks')
    const bookmark = bookmarksData.find(b => b.id === id)
    if (bookmark) {
      if (name) {
        bookmarks.set('bookmarks', [...bookmarksData.find(b => b.id === id).name = name])
        console.log(`[✅] Bookmark (${id}) name has been updated: (${bookmark.name})`)
      }
      if (url) {
        bookmarks.set('bookmarks', [...bookmarksData.find(b => b.id === id).url = url])
        console.log(`[✅] Bookmark (${id}) url has been updated: (${bookmark.url})`)
      }
    } else {
      console.log(`[❌] Bookmark (${id}) not found`)
    }
  }
}
