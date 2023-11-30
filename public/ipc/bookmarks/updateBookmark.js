const { channels } = require('../../constants')
const { currentStoredData } = require('../../electron')

module.exports = {
  name: channels.UPDATE_BOOKMARK,
  once: false,
  handler: false,
  execute(webContents, _, data) {
    const bookmark = currentStoredData.getObject('bookmarksMap', data.id)
    if (!bookmark) return console.log(`[EVENT] --> [${channels.UPDATE_BOOKMARK}] --> [❌] Bookmark not found (${data.id})!`)
    if (data.name) {
      bookmark.name = data.name
    }
    if (data.url) {
      bookmark.url = data.url
    }
    currentStoredData.update('bookmarksMap', bookmark)
    console.log(`[EVENT] --> [${channels.UPDATE_BOOKMARK}] --> [✅] Bookmark (${data.id}) has been updated!`);
  }
}
