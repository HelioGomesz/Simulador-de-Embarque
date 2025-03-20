const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'renderer.js'), // Carrega o script JS do frontend
      nodeIntegration: true // Permite uso de módulos Node.js no frontend
    }
  });

  // Carregar o arquivo HTML da pasta 'src'
  mainWindow.loadFile(path.join(__dirname, 'PagLogin', 'Login.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, 'src', 'renderer.js'),
        nodeIntegration: true
      }
    });

    mainWindow.loadFile(path.join(__dirname, 'PagLogin', 'Login.html'));
  }
});
