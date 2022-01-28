// BACK-END

const { app, BrowserWindow, ipcMain } = require("electron");

const MESSAGE_COUNT = 1000;

app.whenReady().then(() => {
  const window = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.loadFile("index.html");
});

app.on("window-all-closed", app.quit);

class ESize {
  static I = "1kB";
  static X = "10kB";
  static C = "100kB";
  static M = "1MB";
}

function generateRandomString(stringLength) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function prepareRandomStrings(stringLength) {
  let strings = [];
  for (let i = 0; i < MESSAGE_COUNT; i++) {
    strings.unshift(generateRandomString(stringLength));
  }
  return strings;
}

ipcMain.on(ESize.I, (event) => {
  const messages1kB = prepareRandomStrings(1000);
  messages1kB.forEach((message) => {
    event.sender.send(ESize.I, message);
  });
});

ipcMain.on(ESize.X, (event) => {
  const messages10kB = prepareRandomStrings(10000);
  messages10kB.forEach((message) => {
    event.sender.send(ESize.X, message);
  });
});
ipcMain.on(ESize.C, (event) => {
  const messages100kB = prepareRandomStrings(100000);
  messages100kB.forEach((message) => {
    event.sender.send(ESize.C, message);
  });
});
ipcMain.on(ESize.M, (event) => {
  const messages1MB = prepareRandomStrings(1000000);
  messages1MB.forEach((message) => {
    event.sender.send(ESize.M, message);
  });
});
