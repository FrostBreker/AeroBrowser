const { channels } = require("../../constants");

module.exports = {
    name: channels.LOAD_URL,
    once: false,
    handler: false,
    async execute(webContents, _, data) {
        webContents.send(channels.LOAD_URL, data)
    }
}