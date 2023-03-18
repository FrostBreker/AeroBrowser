const { app, BrowserWindow, ipcMain, Menu, autoUpdater, dialog, protocol } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url');
const path = require('path');

let mainWindow = null;
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    minWidth: 536,
    minHeight: 147,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webviewTag: true
    },
    titleBarOverlay: false,
    titleBarStyle: 'hidden',
  });

  mainWindow.removeMenu();

  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
    : "http://127.0.0.1:3000";
  mainWindow.loadURL(appURL);

  const mainWebContents = mainWindow.webContents;

  const template = [
    {
      label: 'My App',
      submenu: [
        {
          label: 'Open DevTools CommandOrControl+Shift+J',
          accelerator: 'CommandOrControl+Shift+I',
          click: () => {
            mainWebContents.send("open-devtools");
          },
        },
        {
          label: 'Open DevTools F12',
          accelerator: 'F12',
          click: () => {
            mainWebContents.send("open-devtools");
          },
        },
        {
          label: 'Open DevTools CommandOrControl+Shift+I',
          accelerator: 'CommandOrControl+Shift+I',
          click: () => {
            mainWebContents.send("open-devtools");
          },
        },
        {
          label: 'Reload F5',
          accelerator: 'F5',
          click: () => {
            mainWebContents.send("reload-tab");
          },
        },
        {
          label: 'Back Alt+Left',
          accelerator: 'Alt+Left',
          click: () => {
            mainWebContents.send("back-in-tab");
          },
        },
        {
          label: 'Previous Alt+Right',
          accelerator: 'Alt+Right',
          click: () => {
            mainWebContents.send("previous-in-tab");
          },
        },
        {
          label: 'Search CommandOrControl+F',
          accelerator: 'CommandOrControl+F',
          click: () => {
            mainWebContents.send("search-in-tab");
          },
        },
        {
          label: 'Open URL in New Tab CommandOrControl+T',
          accelerator: 'CommandOrControl+T',
          click: () => {
            mainWebContents.send("open-url-in-new-tab", "https://www.google.com/");
          },
        },
        {
          label: 'Close Tab CommandOrControl+W',
          accelerator: 'CommandOrControl+W',
          click: () => {
            mainWebContents.send("close-tab");
          },
        },
        {
          label: 'Reopen Tab CommandOrControl+Shift+T',
          accelerator: 'CommandOrControl+Shift+T',
          click: () => {
            mainWebContents.send("reopen-tab");
          },
        },
        {
          label: 'Next Tab CommandOrControl+Tab',
          accelerator: 'CommandOrControl+Tab',
          click: () => {
            mainWebContents.send("next-tab");
          },
        },

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
  const mainWebContents = mainWindow.webContents;

  if (!isDev) {
    const server = 'https://aero-mymeiy532-frostbreker.vercel.app/'
    const url = `${server}/update/${process.platform}/${app.getVersion()}`;
    autoUpdater.setFeedURL({ url })
    autoUpdater.checkForUpdates()

    const UPDATE_CHECK_INTERVAL = 60 * 1000
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

  ipcMain.on("minimizeApp", () => {
    mainWindow?.minimize();
  });
  ipcMain.on("maximizeApp", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow?.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });

  ipcMain.on("closeApp", () => {
    mainWindow?.close();
  });

  mainWindow.webContents.on("did-attach-webview", (_, contents) => {
    contents.setWindowOpenHandler((details) => {
      mainWebContents.send('open-url-in-new-tab', {
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