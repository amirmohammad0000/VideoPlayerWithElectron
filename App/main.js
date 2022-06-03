const Electron = require("electron");
let MainWindow;

Electron.app.on("ready", () => {
    MainWindow = new Electron.BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            nodeIntegrationInWorker: true,
        },
    });
    MainWindow.on("closed", () => {
        MainWindow = null;
        Electron.app.quit();
    });

    MainWindow.maximize();
    MainWindow.loadFile("App/index.html").then(() => {
    });
    MainWindow.show();
});