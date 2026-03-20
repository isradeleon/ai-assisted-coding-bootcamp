const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("tasksApi", {
  getAll: () => ipcRenderer.invoke("tasks:getAll"),
  create: (payload) => ipcRenderer.invoke("tasks:create", payload),
  update: (payload) => ipcRenderer.invoke("tasks:update", payload),
  delete: (payload) => ipcRenderer.invoke("tasks:delete", payload),
});

