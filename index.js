const { app, BrowserWindow, Tray, Menu, MenuItem } = require("electron");
const fs = require("fs");
const path = require("path");
const os = require("os");
const RPC = require("discord-rpc");
const { electron } = require("process");
let client = new RPC.Client({ transport: 'ipc' });

let win;
let splash;
let tray;


let settings = fs.readFileSync(path.join(__dirname, "settings.json"));
settings = JSON.parse(settings);

app.on("ready", () => {
    splash = new BrowserWindow({
        width: 800,
        height: 600,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        icon: path.join(__dirname, "assets", "img", "logo_512.png")
    });
    
    splash.loadFile(path.join(__dirname, "views", "loading.html"));
    splash.center()

    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        minHeight: 800,
        minWidth: 1000,
        resizable: true,
        show: false,
        useContentSize: true,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        },
        title: "Password Manager",
        icon: path.join(__dirname, "assets", "img", "logo_512.png")
    });

    setTimeout(() => {
        splash.close();
        win.loadFile(path.join(__dirname, "views", "index.html"));
        win.show()
        win.focus()
    }, 5000)
});

app.setAppUserModelId("Password_Manager");

app.commandLine.appendSwitch('force_high_performance_gpu');
app.disableHardwareAcceleration()

async function activity() {
    if(!client) {
        return;
    }

    client.setActivity({
        state: 'Password Manager',
        startTimestamp: new Date(),
        largeImageKey: 'logo_512'
    })
}

client.on("ready", () => {
    activity();

    setInterval(() => {
        activity()
    }, 15e3)
})

if(settings.discord_rpc == true) {
    client.login({ clientId: '<your application id>'});
}

if(settings.autoStart == true) {
    app.setLoginItemSettings({
        openAtLogin: true,
        path: app.getPath("exe")
    });
}

app.whenReady().then(() => {
    if(os.platform() == "darwin") {
        tray = new Tray(path.join(__dirname, "assets", "img", "logo_512.png"))
    } else {
        tray = new Tray(path.join(__dirname, "assets", "img", "logo_512.png"))
    }

    const contextMenu = new Menu();
    contextMenu.append(new MenuItem({
        label: 'Show Password Manager',
        click: () => { win.show() }
    }));
    contextMenu.append(new MenuItem({
        label: 'Quit Password Manager',
        click: () => { app.quit() }
    }));

    tray.setContextMenu(contextMenu);

    app.on('window-all-closed', function() {
        app.quit();
    })
})