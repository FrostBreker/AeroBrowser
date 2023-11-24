require('dotenv').config({ path: __dirname + '/.env' })
const { app, BrowserWindow, ipcMain, protocol } = require('electron')
const isDev = require('electron-is-dev')
const url = require('url')
const path = require('path')
const Utils = require('./utils/utils')
const { channels } = require('./constants')
const { bookmarks, downloads } = require('./storedData')
const CustomConsole = require('./classes/CustomConsole')

const customConsole = new CustomConsole();

let mainWindow = null
let mainWebContents = null
const utils = new Utils()
utils.init()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    minWidth: 720,
    minHeight: 147,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      webviewTag: true,
      plugins: true
    },
    titleBarOverlay: {
      color: '#0c0c17',
      symbolColor: 'white',
      height: 39
    },
    titleBarStyle: 'hidden'
  })
  mainWebContents = mainWindow.webContents

  mainWindow.removeMenu()

  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    })
    : 'http://127.0.0.1:3000'

  mainWindow.loadURL(appURL)
}

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    'file',
    (request, callback) => {
      const url = request.url.substr(8)
      callback({ path: path.normalize(`${__dirname}/${url}`) })
    },
    (error) => {
      if (error) console.error('Failed to register protocol')
    }
  )
}

function loadEvents() {
  //BOOKMARKS
  console.log(`[EVENTS] --> Load [✅] : ${channels.ADD_BOOKMARK}`);
  ipcMain.on(channels.ADD_BOOKMARK, (...args) => require("./ipc/bookmarks/addBookmark").execute(mainWebContents, ...args))
  console.log(`[EVENTS] --> Load [✅] : ${channels.REMOVE_BOOKMARK}`);
  ipcMain.on(channels.REMOVE_BOOKMARK, (...args) => require("./ipc/bookmarks/removeBookmark").execute(mainWebContents, ...args))
  console.log(`[EVENTS] --> Load [✅] : ${channels.UPDATE_BOOKMARK}`);
  ipcMain.on(channels.UPDATE_BOOKMARK, (...args) => require("./ipc/bookmarks/updateBookmark").execute(mainWebContents, ...args))
  //DOWNLOADS
  console.log(`[EVENTS] --> Load [✅] : ${channels.GET_DOWNLOADS}`);
  ipcMain.handle(channels.GET_DOWNLOADS, (...args) => require("./ipc/downloads/getDownloads").execute(mainWebContents, ...args))
  //TABS
  console.log(`[EVENTS] --> Load [✅] : ${channels.LOAD_URL}`);
  ipcMain.on(channels.LOAD_URL, (...args) => require("./ipc/tabs/loadURL").execute(mainWebContents, ...args))
}

app.whenReady().then(() => {
  createWindow()
  setupLocalFilesNormalizerProxy()
  utils.setMainWindow(mainWindow)
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {

  }
  loadEvents()
  mainWebContents.on('did-finish-load', () => {
    mainWebContents.send(channels.GET_BOOKMARKS, bookmarks.get('bookmarks'))
    mainWebContents.send(channels.GET_DOWNLOADS, downloads.get('downloads'))
  })

  mainWindow.webContents.on('did-attach-webview', (_, contents) => {
    contents.setWindowOpenHandler((details) => {
      mainWebContents.send(channels.OPEN_URL_IN_NEW_TAB, {
        url: details.url,
        active: details.disposition === 'foreground-tab'
      })
      return { action: 'deny' }
    })
  })
})

app.on('will-quit', () => {

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});