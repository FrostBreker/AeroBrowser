const { channels } = require('../../constants')
const { currentStoredData } = require('../../electron')

module.exports = {
  name: channels.REMOVE_BOOKMARK,
  once: false,
  handler: false,
  execute(webContents, _, id) {
    currentStoredData.remove('bookmarksMap', id)
  }
}
