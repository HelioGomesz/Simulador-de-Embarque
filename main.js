import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

// Em ES Modules, precisamos recriar __dirname manualmente:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 2560,
    height: 1440,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "TelaIniciar", "PaginaIniciar.js"),
      nodeIntegration: true, // Só use se você realmente precisa disso (cuidado com segurança)
    },
  });

  mainWindow.loadFile(
    path.join(__dirname, "TelaIniciar", "PaginaIniciar.html")
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      icon: path.join(__dirname, "icon.ico"),
      webPreferences: {
        preload: path.join(__dirname, "TelaIniciar", "PaginaIniciar.js"),
        nodeIntegration: true,
      },
    });

    mainWindow.loadFile(
      path.join(__dirname, "TelaIniciar", "PaginaIniciar.html")
    );
  }
});
