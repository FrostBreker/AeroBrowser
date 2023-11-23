require("dotenv").config({ path: __dirname + '/.env' });
const { app, BrowserWindow, ipcMain, Menu, protocol } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url');
const path = require('path');
const Utils = require('./utils/utils');
const { channels } = require('./constants');
const { bookmarks, downloads } = require("./storedData");

let mainWindow = null;
let mainWebContents = null;
const utils = new Utils();
utils.init();

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
    titleBarStyle: 'hidden',
  });
  mainWebContents = mainWindow.webContents;

  mainWindow.removeMenu();

  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
    : "http://127.0.0.1:3000";

  mainWindow.loadURL(appURL);


  // const template = [
  //   {
  //     label: 'My App',
  //     submenu: [
  //       {
  //         label: 'Open DevTools CommandOrControl+Shift+J',
  //         accelerator: 'CommandOrControl+Shift+I',
  //         click: () => {
  //           mainWebContents.send(channels.OPEN_DEVTOOLS);
  //         },
  //       },
  //       {
  //         label: 'Open DevTools F12',
  //         accelerator: 'F12',
  //         click: () => {
  //           mainWebContents.send(channels.OPEN_DEVTOOLS);
  //         },
  //       },
  //       {
  //         label: 'Open DevTools CommandOrControl+Shift+I',
  //         accelerator: 'CommandOrControl+Shift+I',
  //         click: () => {
  //           mainWebContents.send(channels.OPEN_DEVTOOLS);
  //         },
  //       },
  //       {
  //         label: 'Reload F5',
  //         accelerator: 'F5',
  //         click: () => {
  //           mainWebContents.send(channels.RELOAD_TAB);
  //         },
  //       },
  //       {
  //         label: 'Back Alt+Left',
  //         accelerator: 'Alt+Left',
  //         click: () => {
  //           mainWebContents.send(channels.BACK_IN_TAB);
  //         },
  //       },
  //       {
  //         label: 'Previous Alt+Right',
  //         accelerator: 'Alt+Right',
  //         click: () => {
  //           mainWebContents.send(channels.PREVIOUS_IN_TAB);
  //         },
  //       },
  //       {
  //         label: 'Search CommandOrControl+F',
  //         accelerator: 'CommandOrControl+F',
  //         click: () => {
  //           mainWebContents.send(channels.SEARCH_IN_TAB);
  //         },
  //       },
  //       {
  //         label: 'Open URL in New Tab CommandOrControl+T',
  //         accelerator: 'CommandOrControl+T',
  //         click: () => {
  //           mainWebContents.send(channels.OPEN_URL_IN_NEW_TAB, {
  //             url: undefined,
  //             active: true
  //           });
  //         },
  //       },
  //       {
  //         label: 'Close Tab CommandOrControl+W',
  //         accelerator: 'CommandOrControl+W',
  //         click: () => {
  //           mainWebContents.send(channels.CLOSE_TAB);
  //         },
  //       },
  //       // {
  //       //   label: 'Reopen Tab CommandOrControl+Shift+T',
  //       //   accelerator: 'CommandOrControl+Shift+T',
  //       //   click: () => {
  //       //     mainWebContents.send("reopen-tab");
  //       //   },
  //       // },
  //       // {
  //       //   label: 'Next Tab CommandOrControl+Tab',
  //       //   accelerator: 'CommandOrControl+Tab',
  //       //   click: () => {
  //       //     mainWebContents.send("next-tab");
  //       //   },
  //       // },

  //     ],
  //   },
  // ];

  // const menu = Menu.buildFromTemplate(template);
  // Menu.setApplicationMenu(menu);
}

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => {
      if (error) console.error("Failed to register protocol");
    }
  );
}

app.whenReady().then(() => {
  createWindow();
  setupLocalFilesNormalizerProxy();
  utils.setMainWindow(mainWindow);
  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {

  }
  require(`./handlers/ipcHandler`)(ipcMain, mainWebContents);
  mainWebContents.on('did-finish-load', () => {
    mainWebContents.send(channels.GET_BOOKMARKS, bookmarks.get('bookmarks'));
    mainWebContents.send(channels.GET_DOWNLOADS, downloads.get('downloads'));
  });

  mainWindow.webContents.on("did-attach-webview", (_, contents) => {
    contents.setWindowOpenHandler((details) => {
      mainWebContents.send(channels.OPEN_URL_IN_NEW_TAB, {
        url: details.url,
        active: details.disposition === 'foreground-tab' ? true : false
      });
      return { action: 'deny' }
    })
  })
});

app.on('will-quit', () => {

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.on("session-created", (session) => {
//   session.on("will-download", async (event, item, webContents) => {
//     event.preventDefault();

//     // Log download information
//     console.log(
//       'Received Bytes: ', item.getReceivedBytes(),
//       'Total Bytes: ', item.getTotalBytes(),
//       'Filename: ', item.getFilename(),
//       'MIME Type: ', item.getMimeType(),
//       'URL: ', item.getURL(),
//       'State: ', item.getState(),
//       'Save Path: ', item.getSavePath(),
//       'Start Time: ', item.getStartTime(),
//       'URL Chain: ', item.getURLChain()
//     );

//     // Start the download with electron-dl
//     electronDl.download(BrowserWindow.getFocusedWindow(), item.getURL(), {
//       directory: app.getPath('downloads'), // Specify the download directory
//       onProgress: (progress) => {
//         // You can use this callback to track download progress
//         console.log('Download progress:', progress);
//       },
//       // Other options as needed
//     })
//       .then((dl) => {
//         // The download has started
//         console.log('Download started:', dl);
//       })
//       .catch((error) => {
//         console.error('Download error:', error);
//       });
//   });
// });