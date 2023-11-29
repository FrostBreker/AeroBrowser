const electronDl = require('electron-dl')
const { downloads } = require('../storedData')
const { channels } = require('../constants')
const Sentry = require('@sentry/electron')
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron');
const { readFileSync, writeFileSync } = require('fs');

class Utils {
  constructor() {
    this.mainWindow = null
    this.mainWebContents = null
  }

  init() {
    electronDl(
      {
        saveAs: true,
        dialogOptions: {
          title: 'Save file',
          buttonLabel: 'Save',
          nameFieldLabel: 'File name'
        },
        onStarted: item => {
          const data = {
            id: this.generateId(),
            startTime: item.getStartTime(),
            state: item.getState(),
            data: {
              savePath: item.getSavePath(),
              urlChain: item.getURLChain(),
              url: item.getURL(),
              filename: item.getFilename(),
              mimeType: item.getMimeType()
            },
            dlData: {
              downloadedBytes: item.getReceivedBytes(),
              totalBytes: item.getTotalBytes(),
              speed: 0,
              isPaused: item.isPaused(),
              isDone: false,
              isInterrupted: false
            }
          }
          this.mainWebContents.send(channels.ADD_DOWNLOAD, data)
          console.log(`[DOWNLOAD] --> Download started: ${item.getFilename()}`)
          const startTime = Date.now() // Example start time in milliseconds
          let downloadedBytes = item.getReceivedBytes() // Initialize downloaded bytes
          let previousTime = startTime // Initialize previous time for the first calculation
          item.on('updated', (event, state) => {
            data.state = state
            if (state === 'interrupted') {
              data.dlData.isInterrupted = true
              this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data)
            } else if (state === 'progressing') {
              function updateDownloadedBytes(newDownloadedBytes) {
                const currentTime = Date.now()
                const elapsedTime = (currentTime - previousTime) / 1000 // Convert to seconds

                // Calculate speed based on the change in downloaded bytes and time elapsed
                const speed = (newDownloadedBytes - downloadedBytes) / elapsedTime // Speed in bytes per second
                downloadedBytes = newDownloadedBytes // Update downloaded bytes
                previousTime = currentTime // Update previous time
                return speed
              }
              data.data.savePath = item.getSavePath()
              if (item.isPaused()) {
                data.dlData.isPaused = true
                this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data)
              } else {
                data.dlData.downloadedBytes = item.getReceivedBytes()
                data.dlData.totalBytes = item.getTotalBytes()
                data.dlData.speed = updateDownloadedBytes(item.getReceivedBytes())
                this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data)
              }
            }
          })

          item.on('done', (event, state) => {
            data.state = state
            if (state === 'completed') {
              console.log('Download successfully')
              data.dlData.isDone = true
              this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data)
              downloads.set('downloads', [...downloads.get('downloads'), data])
            } else {
              console.log(`Download failed: ${state}`)
            }
          })
        }
      }
    );
  }

  setMainWindow(mainWindow) {
    this.mainWindow = mainWindow
    this.mainWebContents = mainWindow.webContents
  }

  setSentry() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      // This enables automatic instrumentation (highly recommended), but is not
      // necessary for purely manual usage.
      // We recommend adjusting this value in production, or using tracesSampler
      // for finer control
      tracesSampleRate: 1.0,
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost"],
      environment: process.env.NODE_ENV,
      release: process.env.RELEASE_VERSION,
    });
  }

  async setAdAndTrackerBlocker(mainWindow) {
    const blocker = await ElectronBlocker.fromLists(
      fetch,
      fullLists,
      {
        enableCompression: true,
      },
    );

    blocker.enableBlockingInSession(mainWindow.webContents.session);

    // blocker.on('request-blocked', (request) => {
    //   console.log('blocked', request.tabId, request.url);
    // });

    // blocker.on('request-redirected', (request) => {
    //   console.log('redirected', request.tabId, request.url);
    // });

    // blocker.on('request-whitelisted', (request) => {
    //   console.log('whitelisted', request.tabId, request.url);
    // });

    // blocker.on('csp-injected', (request) => {
    //   console.log('csp', request.url);
    // });

    // blocker.on('script-injected', (script, url) => {
    //   console.log('script', script.length, url);
    // });

    // blocker.on('style-injected', (style, url) => {
    //   console.log('style', style.length, url);
    // });
  }

  convertBytesToHumanReadable(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) {
      return '0 Bytes'
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return {
      size: Math.round(bytes / Math.pow(1024, i)),
      unit: sizes[i]
    }
  }

  generateId() {
    return `_${Math.random().toString(36).substr(2, 9)}`
  }
}

module.exports = Utils
