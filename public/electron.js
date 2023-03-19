const { app, BrowserWindow, ipcMain, Menu, autoUpdater, dialog, protocol } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url');
const path = require('path');
const { channels } = require('./constants');

// app.commandLine.appendSwitch('widevine-cdm-path', '/widevinecdm.dll')
// // The version of plugin can be got from `chrome://components` page in Chrome.
// app.commandLine.appendSwitch('widevine-cdm-version', '4.10.2557.0')

let mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    minWidth: 536,
    minHeight: 147,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      webviewTag: true,
      plugins: true,
      extraResources: [
        { "from": "widevine", "to": "widevine" }
      ]
    },
    titleBarOverlay: false,
    titleBarStyle: 'hidden',
  });
  const mainWebContents = mainWindow.webContents;

  ipcMain.on(channels.MINIMIZE_APP, () => {
    mainWindow?.minimize();
  });
  ipcMain.on(channels.MAXIMIZE_APP, () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });
  ipcMain.on(channels.CLOSE_APP, () => {
    mainWindow?.close();
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

  mainWindow.removeMenu();

  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
    : "http://127.0.0.1:3000";
  mainWindow.loadURL(appURL);


  const template = [
    {
      label: 'My App',
      submenu: [
        {
          label: 'Open DevTools CommandOrControl+Shift+J',
          accelerator: 'CommandOrControl+Shift+I',
          click: () => {
            mainWebContents.send(channels.OPEN_DEVTOOLS);
          },
        },
        {
          label: 'Open DevTools F12',
          accelerator: 'F12',
          click: () => {
            mainWebContents.send(channels.OPEN_DEVTOOLS);
          },
        },
        {
          label: 'Open DevTools CommandOrControl+Shift+I',
          accelerator: 'CommandOrControl+Shift+I',
          click: () => {
            mainWebContents.send(channels.OPEN_DEVTOOLS);
          },
        },
        {
          label: 'Reload F5',
          accelerator: 'F5',
          click: () => {
            mainWebContents.send(channels.RELOAD_TAB);
          },
        },
        {
          label: 'Back Alt+Left',
          accelerator: 'Alt+Left',
          click: () => {
            mainWebContents.send(channels.BACK_IN_TAB);
          },
        },
        {
          label: 'Previous Alt+Right',
          accelerator: 'Alt+Right',
          click: () => {
            mainWebContents.send(channels.PREVIOUS_IN_TAB);
          },
        },
        {
          label: 'Search CommandOrControl+F',
          accelerator: 'CommandOrControl+F',
          click: () => {
            mainWebContents.send(channels.SEARCH_IN_TAB);
          },
        },
        {
          label: 'Open URL in New Tab CommandOrControl+T',
          accelerator: 'CommandOrControl+T',
          click: () => {
            mainWebContents.send(channels.OPEN_URL_IN_NEW_TAB, {
              url: undefined,
              active: true
            });
          },
        },
        {
          label: 'Close Tab CommandOrControl+W',
          accelerator: 'CommandOrControl+W',
          click: () => {
            mainWebContents.send(channels.CLOSE_TAB);
          },
        },
        // {
        //   label: 'Reopen Tab CommandOrControl+Shift+T',
        //   accelerator: 'CommandOrControl+Shift+T',
        //   click: () => {
        //     mainWebContents.send("reopen-tab");
        //   },
        // },
        // {
        //   label: 'Next Tab CommandOrControl+Tab',
        //   accelerator: 'CommandOrControl+Tab',
        //   click: () => {
        //     mainWebContents.send("next-tab");
        //   },
        // },

      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
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

  if (!isDev) {
    const server = 'https://aero-mymeiy532-frostbreker.vercel.app/'
    const url = `${server}/update/${process.platform}/${app.getVersion()}`;
    autoUpdater.setFeedURL({ url })
    autoUpdater.checkForUpdates()

    const UPDATE_CHECK_INTERVAL = 10 * 60 * 1000
    setInterval(() => {
      autoUpdater.checkForUpdates()
    }, UPDATE_CHECK_INTERVAL)

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
      }
      dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
      })
    })
  } else {
    console.log("Running in development mode");
    mainWindow.webContents.openDevTools();
  }
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