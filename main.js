import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn, fork } from 'child_process';
import fs from 'fs';

// Em ES Modules, precisamos recriar __dirname manualmente:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detecta se está em produção (empacotado) ou desenvolvimento
const isDev = !app.isPackaged;
const isWindows = process.platform === 'win32';

// Determina o caminho base da aplicação
// app.getAppPath() funciona tanto em dev quanto em produção
const appPath = app.getAppPath();

let mainWindow;
let serverProcess;

app.whenReady().then(() => {
  // Determina o caminho do servidor
  let serverPath;
  let serverCwd;
  
  if (isDev) {
    // Em desenvolvimento, usa o caminho direto
    serverPath = path.join(appPath, 'server.js');
    serverCwd = appPath;
  } else {
    // Em produção, os arquivos descompactados estão em app.asar.unpacked
    const electronDir = path.dirname(process.execPath);
    
    // Tenta diferentes localizações possíveis para o server.js
    const possiblePaths = [
      // Formato portable - arquivos podem estar na mesma pasta do executável
      path.join(electronDir, 'resources', 'app.asar.unpacked', 'server.js'),
      // Formato dir - arquivos podem estar em resources/app.asar.unpacked
      path.join(electronDir, 'resources', 'app.asar.unpacked', 'server.js'),
      // Fallback - tenta no appPath (dentro do asar)
      path.join(appPath, 'server.js'),
      // Último fallback - tenta na mesma pasta do executável
      path.join(electronDir, 'server.js')
    ];
    
    // Procura o primeiro caminho que existe
    serverPath = possiblePaths.find(p => fs.existsSync(p));
    
    if (serverPath) {
      serverCwd = path.dirname(serverPath);
    } else {
      // Se não encontrar, tenta usar o appPath mesmo assim
      serverPath = path.join(appPath, 'server.js');
      serverCwd = appPath;
      console.warn(`[WARN] Server.js não encontrado nos caminhos esperados, usando: ${serverPath}`);
    }
  }
  
  // Verifica se o arquivo do servidor existe
  if (!fs.existsSync(serverPath)) {
    console.error(`[ERROR] Arquivo do servidor não encontrado: ${serverPath}`);
    console.error(`[DEBUG] appPath: ${appPath}`);
    console.error(`[DEBUG] electronDir: ${path.dirname(process.execPath)}`);
    console.error(`[DEBUG] Tentando listar arquivos em appPath...`);
    try {
      const files = fs.readdirSync(appPath);
      console.error(`[DEBUG] Arquivos em appPath:`, files.slice(0, 10));
    } catch (e) {
      console.error(`[DEBUG] Erro ao listar arquivos:`, e.message);
    }
    return;
  }
  
  console.log(`[INFO] Iniciando servidor de: ${serverPath}`);
  console.log(`[INFO] Working directory: ${serverCwd}`);
  
  // Usa o próprio executável do Electron como Node.js para executar o servidor
  // Isso funciona porque o Electron inclui o Node.js
  const electronExecutable = process.execPath;
  
  serverProcess = spawn(electronExecutable, [serverPath], {
    cwd: serverCwd,
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: false,
    shell: false,
    env: {
      ...process.env,
      APP_PATH: serverCwd,
      NODE_PATH: serverCwd,
      ELECTRON_RUN_AS_NODE: '1' // Diz ao Electron para executar como Node.js
    }
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`[server] ${data}`.toString());
  });
  serverProcess.stderr.on('data', (data) => {
    console.error(`[server] ${data}`.toString());
  });
  serverProcess.on('exit', (code) => {
    console.log(`[server] exited with code ${code}`);
  });


  // Determina o caminho do ícone
  // Tenta diferentes localizações possíveis
  let iconPath;
  if (isDev) {
    iconPath = path.join(__dirname, "icon.ico");
  } else {
    const electronDir = path.dirname(process.execPath);
    const possibleIconPaths = [
      path.join(electronDir, "Imagens", "icon.ico"),
      path.join(electronDir, "resources", "app.asar.unpacked", "Imagens", "icon.ico"),
      path.join(appPath, "Imagens", "icon.ico"),
      path.join(appPath, "icon.ico"),
      path.join(__dirname, "icon.ico")
    ];
    
    iconPath = possibleIconPaths.find(p => fs.existsSync(p)) || path.join(__dirname, "icon.ico");
  }

  mainWindow = new BrowserWindow({
    width: 2560,
    height: 1440,
    icon: iconPath,
    autoHideMenuBar: true, // Oculta a barra de menu automaticamente
    webPreferences: {
      preload: path.join(appPath, "TelaIniciar", "PaginaIniciar.js"),
      nodeIntegration: true, // Só use se você realmente precisa disso (cuidado com segurança)
      contextIsolation: false, // Necessário para nodeIntegration funcionar
    },
  });

  mainWindow.loadFile(
    path.join(appPath, "TelaIniciar", "PaginaIniciar.html")
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
    // Determina o caminho do ícone (mesma lógica de antes)
    let iconPath;
    if (isDev) {
      iconPath = path.join(__dirname, "icon.ico");
    } else {
      const electronDir = path.dirname(process.execPath);
      const possibleIconPaths = [
        path.join(electronDir, "Imagens", "icon.ico"),
        path.join(electronDir, "resources", "app.asar.unpacked", "Imagens", "icon.ico"),
        path.join(appPath, "Imagens", "icon.ico"),
        path.join(appPath, "icon.ico"),
        path.join(__dirname, "icon.ico")
      ];
      
      iconPath = possibleIconPaths.find(p => fs.existsSync(p)) || path.join(__dirname, "icon.ico");
    }
      
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      icon: iconPath,
      autoHideMenuBar: true, // Oculta a barra de menu automaticamente
      webPreferences: {
        preload: path.join(appPath, "TelaIniciar", "PaginaIniciar.js"),
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    mainWindow.loadFile(
      path.join(appPath, "TelaIniciar", "PaginaIniciar.html")
    );
  }
});
