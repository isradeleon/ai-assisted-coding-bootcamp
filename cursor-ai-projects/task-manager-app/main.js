const path = require("node:path");
const electron = require("electron");
const { app, BrowserWindow } = electron;
const { randomUUID } = require("node:crypto");

const STATUSES = ["Pending", "In progress", "Done"];

let store;
let storeInitPromise;

async function getStore() {
  if (store) return store;
  if (!storeInitPromise) {
    storeInitPromise = import("electron-store").then((mod) => {
      const StoreCtor = mod?.default ?? mod;
      store = new StoreCtor({
        name: "tasks-store",
        defaults: { tasks: [] },
      });
      return store;
    });
  }
  return storeInitPromise;
}

function normalizeStatus(status) {
  const next = String(status ?? "");
  if (!STATUSES.includes(next)) throw new Error("Invalid status");
  return next;
}

async function getTasks() {
  const s = await getStore();
  return s.get("tasks");
}

async function setTasks(tasks) {
  const s = await getStore();
  s.set("tasks", tasks);
}

function registerIpcHandlers() {
  const ipcMain = electron.ipcMain;
  if (!ipcMain) throw new Error("ipcMain is not available in this process.");

  ipcMain.handle("tasks:getAll", async () => {
    return getTasks();
  });

  ipcMain.handle("tasks:create", async (event, payload) => {
    const title = String(payload?.title ?? "").trim();
    const status = normalizeStatus(payload?.status ?? "Pending");

    if (!title) throw new Error("Title is required");

    const tasks = await getTasks();
    const task = {
      id: randomUUID(),
      title,
      status,
      createdAt: Date.now(),
    };

    // New tasks appear first.
    tasks.unshift(task);
    await setTasks(tasks);
    return task;
  });

  ipcMain.handle("tasks:update", async (event, payload) => {
    const id = String(payload?.id ?? "");
    const status = normalizeStatus(payload?.status);

    const tasks = await getTasks();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Task not found");

    const next = tasks.slice();
    next[idx] = { ...next[idx], status };
    await setTasks(next);
    return next[idx];
  });

  ipcMain.handle("tasks:delete", async (event, payload) => {
    const id = String(payload?.id ?? "");
    const tasks = await getTasks();
    const next = tasks.filter((t) => t.id !== id);

    if (next.length === tasks.length) throw new Error("Task not found");
    await setTasks(next);
    return { ok: true };
  });
}

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
  registerIpcHandlers();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  // On macOS it's common for applications to keep running until the user quits.
  if (process.platform !== "darwin") app.quit();
});

