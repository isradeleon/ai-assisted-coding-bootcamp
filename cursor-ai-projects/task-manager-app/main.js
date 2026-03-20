const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
const { randomUUID } = require("node:crypto");

const STATUSES = ["Pending", "In progress", "Done"];

const store = new Store({
  name: "tasks-store",
  defaults: { tasks: [] },
});

function normalizeStatus(status) {
  const next = String(status ?? "");
  if (!STATUSES.includes(next)) throw new Error("Invalid status");
  return next;
}

function getTasks() {
  return store.get("tasks");
}

function setTasks(tasks) {
  store.set("tasks", tasks);
}

ipcMain.handle("tasks:getAll", () => {
  return getTasks();
});

ipcMain.handle("tasks:create", (event, payload) => {
  const title = String(payload?.title ?? "").trim();
  const status = normalizeStatus(payload?.status ?? "Pending");

  if (!title) throw new Error("Title is required");

  const tasks = getTasks();
  const task = {
    id: randomUUID(),
    title,
    status,
    createdAt: Date.now(),
  };

  // New tasks appear first.
  tasks.unshift(task);
  setTasks(tasks);
  return task;
});

ipcMain.handle("tasks:update", (event, payload) => {
  const id = String(payload?.id ?? "");
  const status = normalizeStatus(payload?.status);

  const tasks = getTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Task not found");

  const next = tasks.slice();
  next[idx] = { ...next[idx], status };
  setTasks(next);
  return next[idx];
});

ipcMain.handle("tasks:delete", (event, payload) => {
  const id = String(payload?.id ?? "");
  const tasks = getTasks();
  const next = tasks.filter((t) => t.id !== id);

  if (next.length === tasks.length) throw new Error("Task not found");
  setTasks(next);
  return { ok: true };
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 980,
    minHeight: 680,
    title: "Vibe Task Manager",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // On macOS it's common for applications to keep running until the user quits.
  if (process.platform !== "darwin") app.quit();
});

