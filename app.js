// FRONT-END

const { ipcRenderer } = require("electron");

class ESize {
  static I = "1kB";
  static X = "10kB";
  static C = "100kB";
  // static M = "1MB";
}

setTimeout(() => {
  ipcRenderer.send(ESize.I);
}, 2000);

const maxCount = 999;
let count = 0;
let time;

function changeTo(index, newStuff) {
  document.getElementById(`${index}`).innerHTML = newStuff;
}

ipcRenderer.on(ESize.I, (event, message) => {
  if (count == 0) {
    time = Date.now();
  } else if (count >= maxCount) {
    const duration = Date.now() - time;
    changeTo(1, `${ESize.I} Test takes: ${duration} ms (${duration / 1000}s)`);
    count = 0;
    ipcRenderer.send(ESize.X);
  }
  count++;
});

ipcRenderer.on(ESize.X, (event, message) => {
  if (count == 0) {
    time = Date.now();
  } else if (count >= maxCount) {
    const duration = Date.now() - time;
    changeTo(2, `${ESize.X} Test takes: ${duration} ms (${duration / 1000}s)`);
    count = 0;
    ipcRenderer.send(ESize.C);
  }
  count++;
});

ipcRenderer.on(ESize.C, (event, message) => {
  if (count == 0) {
    time = Date.now();
  } else if (count >= maxCount) {
    const duration = Date.now() - time;
    changeTo(3, `${ESize.C} Test takes: ${duration} ms (${duration / 1000}s)`);
    count = 0;
    // ipcRenderer.send(ESize.M);
  }
  count++;
});

// ipcRenderer.on(ESize.M, (event, message) => {
//   if (count == 0) {
//     time = Date.now();
//   } else if (count >= maxCount) {
//     const duration = Date.now() - time;
//     changeTo(4, `${ESize.M} Test takes: ${duration} ms (${duration / 1000}s)`);
//   }
//   count++;
// });
