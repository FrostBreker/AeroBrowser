const { channels } = require('../../constants')
const { currentStoredData } = require("../../electron")

module.exports = {
  name: channels.ADD_BOOKMARK,
  once: false,
  handler: false,
  execute(webContents, _, data) {
    currentStoredData.add('bookmarksMap', data);
  }
}
