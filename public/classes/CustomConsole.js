const EventEmitter = require('events')
const fs = require('fs')
const path = require('path')
const { folders } = require('../constants')

class CustomConsole extends EventEmitter {
  constructor () {
    super()
    const originalConsoleLog = console.log

    const logsFolder = folders.logsFolder
    const logPathFile = path.join(logsFolder, `log-${Date.now()}.log`)

    // Create the extensions folder if it doesn't exist
    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder, { recursive: true })
      console.log(`[✅] Extensions folder has been created: (${logsFolder})`)
    }
    // Create the log file when the CustomConsole is instantiated
    fs.writeFileSync(logPathFile, '')

    console.log = (...args) => {
      // Emit an event for every console log
      this.emit('consoleLog', args)

      // Write logs to the log file
      fs.appendFile(logPathFile, args.join(' ') + '\n', (err) => {
        if (err) throw err
      })

      // Call the original console.log function to keep the original behavior
      originalConsoleLog.apply(console, args)
    }
  }
}

module.exports = CustomConsole
