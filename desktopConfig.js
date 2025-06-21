const { app, BrowserWindow } = require('electron');
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  remoteMain.enable(win.webContents);
  win.loadFile('index.html');
}
