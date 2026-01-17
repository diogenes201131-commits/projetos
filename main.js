const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

ipcMain.handle('salvar-os', (event, os) => {
  return db.salvarOS(os);
});

ipcMain.handle('listar-os', () => {
  return db.listarOS();
});

ipcMain.handle('buscar-os', (event, id) => {
  return db.buscarOS(id);
});

app.whenReady().then(createWindow);
