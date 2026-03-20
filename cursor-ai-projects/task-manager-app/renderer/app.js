const STATUSES = ["Pending", "In progress", "Done"];

const titleInput = document.getElementById("titleInput");
const statusInput = document.getElementById("statusInput");
const createForm = document.getElementById("createForm");
const searchInput = document.getElementById("searchInput");

const toastEl = document.getElementById("toast");

function showToast(message, { variant = "error" } = {}) {
  toastEl.textContent = message;
  toastEl.style.borderColor =
    variant === "success" ? "rgba(16, 185, 129, 0.55)" : "rgba(239, 68, 68, 0.55)";
  toastEl.classList.add("show");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => toastEl.classList.remove("show"), 2600);
}

function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function statusToBadge(dataStatus) {
  const badge = document.createElement("span");
  badge.className = "status-badge";
  badge.dataset.status = dataStatus;
  badge.textContent = dataStatus;
  return badge;
}

function createCard(task) {
  const card = document.createElement("article");
  card.className = "card";
  card.draggable = true;

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const created = document.createElement("div");
  created.className = "created-at";
  created.textContent = formatTime(task.createdAt);

  meta.appendChild(created);
  meta.appendChild(statusToBadge(task.status));

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const selectWrap = document.createElement("div");
  const select = document.createElement("select");
  select.className = "mini-select";
  select.setAttribute("aria-label", "Change task status");
  select.draggable = false;

  for (const s of STATUSES) {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    if (s === task.status) opt.selected = true;
    select.appendChild(opt);
  }

  select.addEventListener("change", async () => {
    try {
      await window.tasksApi.update({ id: task.id, status: select.value });
    } catch (err) {
      showToast(err?.message || "Failed to update task", { variant: "error" });
    }
    await refresh();
  });

  selectWrap.appendChild(select);

  const del = document.createElement("button");
  del.className = "delete-btn";
  del.type = "button";
  del.title = "Delete task";
  del.setAttribute("aria-label", "Delete task");
  del.draggable = false;
  del.innerHTML =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 16h10l1-16"/></svg>';

  del.addEventListener("click", async () => {
    const ok = window.confirm(`Delete "${task.title}"?`);
    if (!ok) return;
    try {
      await window.tasksApi.delete({ id: task.id });
      showToast("Task deleted", { variant: "success" });
    } catch (err) {
      showToast(err?.message || "Failed to delete task", { variant: "error" });
    }
    await refresh();
  });

  actions.appendChild(selectWrap);
  actions.appendChild(del);

  card.appendChild(title);
  card.appendChild(meta);
  card.appendChild(actions);

  // Drag & drop: move the task to the column you drop it on.
  card.addEventListener("dragstart", (e) => {
    // Avoid starting a drag when the user interacts with controls.
    const target = e.target;
    if (
      target &&
      typeof target.closest === "function" &&
      (target.closest("select") || target.closest("button"))
    ) {
      e.preventDefault();
      return;
    }

    card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", task.id);
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  return card;
}

function setCount(status, count) {
  const el = document.getElementById(`count-${statusId(status)}`);
  if (!el) return;
  el.textContent = String(count);
}

function getBody(status) {
  return document.getElementById(`body-${statusId(status)}`);
}

function normalizeQuery(s) {
  return String(s ?? "").trim().toLowerCase();
}

function statusId(status) {
  // DOM ids cannot contain spaces, but statuses do ("In progress").
  return String(status).replace(/\s+/g, "-");
}

function taskMatchesQuery(task, q) {
  if (!q) return true;
  return String(task.title ?? "").toLowerCase().includes(q);
}

function setupDragAndDrop() {
  const columns = document.querySelectorAll(".column");
  for (const col of columns) {
    col.addEventListener("dragover", (e) => {
      // Required for dropping to be allowed.
      e.preventDefault();
      col.classList.add("drag-over");
      e.dataTransfer.dropEffect = "move";
    });

    col.addEventListener("dragleave", (e) => {
      // Prevent flicker when moving between child elements inside the column.
      if (col.contains(e.relatedTarget)) return;
      col.classList.remove("drag-over");
    });

    col.addEventListener("drop", async (e) => {
      e.preventDefault();
      col.classList.remove("drag-over");

      const id = e.dataTransfer.getData("text/plain");
      const nextStatus = col.dataset.status;
      if (!id || !nextStatus) return;

      try {
        await window.tasksApi.update({ id, status: nextStatus });
        showToast(`Moved to "${nextStatus}"`, { variant: "success" });
      } catch (err) {
        showToast(err?.message || "Failed to move task", { variant: "error" });
      }

      await refresh();
    });
  }
}

async function refresh() {
  const q = normalizeQuery(searchInput?.value);
  let tasks = [];
  try {
    tasks = await window.tasksApi.getAll();
  } catch (err) {
    showToast(err?.message || "Failed to load tasks");
    return;
  }

  // Clear columns.
  for (const status of STATUSES) {
    const body = getBody(status);
    if (body) body.innerHTML = "";
  }

  // Sort newest-first (main already unshifts, but keep deterministic here too).
  tasks = (Array.isArray(tasks) ? tasks : [])
    .slice()
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));

  const filtered = tasks.filter((t) => taskMatchesQuery(t, q));

  for (const status of STATUSES) {
    const body = getBody(status);
    const inStatus = filtered.filter((t) => t.status === status);
    setCount(status, inStatus.length);

    for (const t of inStatus) {
      body.appendChild(createCard(t));
    }
  }
}

createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const status = statusInput.value;
  if (!title) return;

  try {
    await window.tasksApi.create({ title, status });
    titleInput.value = "";
    titleInput.focus();
  } catch (err) {
    showToast(err?.message || "Failed to create task");
  }

  await refresh();
});

searchInput.addEventListener("input", () => {
  refresh();
});

document.addEventListener("DOMContentLoaded", () => {
  titleInput.focus();
  setupDragAndDrop();
  refresh();
});

