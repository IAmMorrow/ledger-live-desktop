// @flow

import WebSocket from "ws";
import { ipcMain } from "electron";

export function initPlatformAPI(mainWindow) {
  const wss = new WebSocket.Server({ port: 8084 });
  let client = null;

  ipcMain.handle("platformSend", (event, message) => {
    if (client) {
      client.send(message);
    }
  });
  console.log("INITIALIZED")

  wss.on("connection", ws => {
    client = ws;
    console.log("CONNECTED")
    ws.on('message', (msg: string) => {
      console.log("MESSAGE: ", msg)
      mainWindow.webContents.send("platformReceive", msg);
    });
  });
}
