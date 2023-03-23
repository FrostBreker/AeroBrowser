require("dotenv").config({ path: __dirname + '/.env' });
const { app, BrowserWindow, ipcMain, Menu, autoUpdater, dialog, protocol, crashReporter } = require('electron');
const isDev = require('electron-is-dev');
const url = require('url');
const path = require('path');

const { channels } = require('./constants');

const Store = require('./classes/Store');

const { init } = require('@sentry/electron');
const { BrowserTracing } = require('@sentry/tracing');

init({
  dsn: process.env.SENTRY_DSN,
  debug: false,
  ipcMode: 'native',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
crashReporter.start({
  companyName: "FrostBreker",
  productName: "Aero",
  ignoreSystemCrashHandler: false,
  submitURL: process.env.SENTRY_DSN,
});
let mainWindow = null;
let mainWebContents = null;
const userPreference = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 1024, height: 728 },
    defaultDownloadPath: app.getPath('downloads'),
    defaultSearchEngine: 'google',
    defaultSearchEngineURL: 'https://www.google.com/search?q=',
    defaultSearchEngineIcon: 'https://www.google.com/favicon.ico',
    defaultSearchEngineSuggestionURL: 'https://suggestqueries.google.com/complete/search?client=firefox&q=',
  },
});

const bookmarks = new Store({
  configName: 'bookmarks',
  defaults: {
    bookmarks: []
  },
});

const tabs = new Store({
  configName: 'tabs',
  defaults: {
    tabs: []
  },
});

const defaultUserPreference = [
  { key: 'windowBounds', value: { width: 1024, height: 728 } },
  { key: 'defaultDownloadPath', value: app.getPath('downloads') },
  { key: 'defaultSearchEngine', value: 'google' },
  { key: 'defaultSearchEngineURL', value: 'https://www.google.com/search?q=' },
  { key: 'defaultSearchEngineIcon', value: 'https://www.google.com/favicon.ico' },
  { key: 'defaultSearchEngineSuggestionURL', value: 'https://suggestqueries.google.com/complete/search?client=firefox&q=' },
];

const defaultBookmarks = [
  { key: 'bookmarks', value: [] },
];

const defaultTabs = [
  { key: 'tabs', value: [] },
];

defaultUserPreference.forEach((preference) => {
  if (!userPreference.get(preference.key)) {
    userPreference.set(preference.key, preference.value);
  }
});

defaultBookmarks.forEach((bookmark) => {
  if (!bookmarks.get(bookmark.key)) {
    bookmarks.set(bookmark.key, bookmark.value);
  }
});

defaultTabs.forEach((tab) => {
  if (!tabs.get(tab.key)) {
    tabs.set(tab.key, tab.value);
  }
});

function createWindow() {
  let { width, height } = userPreference.get('windowBounds');
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: 536,
    minHeight: 147,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      webviewTag: true,
      plugins: true
    },
    titleBarOverlay: false,
    titleBarStyle: 'hidden',
  });
  mainWebContents = mainWindow.webContents;

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
  ipcMain.on(channels.CLOSE_APP, (_, data) => {
    tabs.set('tabs', data);
    mainWindow?.close();
  });
  ipcMain.on(channels.OPEN_URL, (_, data) => {
    mainWebContents.send(channels.OPEN_URL_IN_RENDERER, data);
  });
  ipcMain.on(channels.OPEN_URL_IN_NEW_TAB, (_, data) => {
    mainWebContents.send(channels.OPEN_URL_IN_NEW_TAB, data);
  });
  ipcMain.on(channels.ADD_BOOKMARK, (_, data) => {
    bookmarks.set('bookmarks', [...bookmarks.get('bookmarks'), data]);
    mainWebContents.send(channels.GET_BOOKMARKS, bookmarks.get('bookmarks'));
  });
  ipcMain.on(channels.REMOVE_BOOKMARK, (_, url) => {
    bookmarks.set('bookmarks', bookmarks.get('bookmarks').filter(bookmark => bookmark.url !== url));
    mainWebContents.send(channels.GET_BOOKMARKS, bookmarks.get('bookmarks'));
  })
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
    // autoUpdater.setFeedURL({ url })
    // autoUpdater.checkForUpdates()

    // const UPDATE_CHECK_INTERVAL = 10 * 60 * 1000
    // setInterval(() => {
    //   autoUpdater.checkForUpdates()
    // }, UPDATE_CHECK_INTERVAL)

    // autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    //   const dialogOpts = {
    //     type: 'info',
    //     buttons: ['Restart', 'Later'],
    //     title: 'Application Update',
    //     message: process.platform === 'win32' ? releaseNotes : releaseName,
    //     detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    //   }
    //   dialog.showMessageBox(dialogOpts).then((returnValue) => {
    //     if (returnValue.response === 0) autoUpdater.quitAndInstall()
    //   })
    // })
  } else {
    console.log("Running in development mode");
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send(channels.GET_USER_PREFERENCES, userPreference.getAll());
    mainWindow.webContents.send(channels.GET_BOOKMARKS, bookmarks.get('bookmarks'));
    mainWindow.webContents.send(channels.GET_TABS, tabs.get('tabs'));
  });
  mainWindow.on("resize", () => {
    let { width, height } = mainWindow.getBounds();
    userPreference.set('windowBounds', { width, height });
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