const { channels } = require('../../constants')
const { currentStoredData } = require('../../electron')

module.exports = {
  name: channels.GET_DOWNLOADS,
  once: false,
  handler: true,
  execute(webContents, _, count) {
    const downloadsData = currentStoredData.get('downloadsMap')
    downloadsData.sort((a, b) => b.startTime - a.startTime)
    const downloadsFiltered = downloadsData.slice(0, count)
    return downloadsFiltered
  }
}
