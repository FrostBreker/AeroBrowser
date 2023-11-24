const { channels } = require('../../constants')
const { downloads } = require('../../storedData')

module.exports = {
  name: channels.GET_DOWNLOADS,
  once: false,
  handler: true,
  async execute (webContents, _, count) {
    const downloadsData = downloads.get('downloads')
    downloadsData.sort((a, b) => b.startTime - a.startTime)
    const downloadsFiltered = downloadsData.slice(0, count)
    return downloadsFiltered
  }
}
