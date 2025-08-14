import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

// Em ES Modules, precisamos recriar __dirname manualmente:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let serverProcess;

app.whenReady().then(() => {
  // Inicia o servidor Node.js
  serverProcess = spawn(process.platform === 'win32' ? 'node.exe' : 'node', ['server.js'], {
    cwd: __dirname,
    stdio: 'ignore', // Ignora a saída do servidor no console do Electron
    detached: true, // Permite que o processo do servidor continue rodando após o Electron fechar
    shell: false,
  });

  serverProcess.unref(); // Permite que o processo do servidor continue rodando independentemente do Electron


  mainWindow = new BrowserWindow({
    width: 2560,
    height: 1440,
    icon: path.join(__dirname, "icon.ico"),
    autoHideMenuBar: true, // Oculta a barra de menu automaticamente
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
  if (serverProcess) serverProcess.kill();
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      icon: path.join(__dirname, "icon.ico"),
      autoHideMenuBar: true, // Oculta a barra de menu automaticamente
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
