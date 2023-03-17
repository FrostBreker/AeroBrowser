const { app, BrowserWindow, ipcMain, Menu } = require('electron');

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
  mainWindow.loadURL('http://127.0.0.1:3000');

  mainWindow.webContents.openDevTools();
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

app.whenReady().then(() => {
  createWindow();
  const mainFocusedWindow = BrowserWindow.getFocusedWindow();
  const mainWebContents = mainWindow.webContents;

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