// @flow

const { ipcRenderer } = require("electron");

window.ElectronWebview = {
  postMessage: (message: any) => ipcRenderer.sendToHost("webviewToParent", message),
};
