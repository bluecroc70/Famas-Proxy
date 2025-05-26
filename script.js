// DOM elements
const input = document.getElementById("urlInput");
const goBtn = document.getElementById("goButton");
const frame = document.getElementById("proxyFrame");
const home = document.getElementById("homeScreen");
const proxy = document.getElementById("proxyScreen");
const toggle = document.getElementById("darkModeToggle");

const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const taskbar = document.getElementById("taskbar");
const homeBtn = document.getElementById("homeBtn");

// History state
let historyStack = [];
let currentIndex = -1;

// Helper to detect if input looks like a URL (has dot + TLD-like suffix)
function isLikelyURL(str) {
  return /\.[a-z]{2,6}($|\/)/i.test(str);
}

// Navigate to URL or search query
function navigateTo(rawInput) {
  if (!rawInput) return;

  let url;

  if (isLikelyURL(rawInput)) {
    url = rawInput.match(/^https?:\/\//i) ? rawInput : "https://" + rawInput;
  } else {
    url = `https://duckduckgo.com/?q=${encodeURIComponent(rawInput)}`;
  }

  currentIndex++;
  historyStack = historyStack.slice(0, currentIndex);
  historyStack.push(url);

  loadURL(url);
}

// Load URL into iframe and update UI
function loadURL(url) {
  frame.src = url;
  taskbar.value = url;
  home.style.display = "none";
  proxy.style.display = "flex";
  taskbar.focus();
}

// Open proxy from home input
function openProxy() {
  navigateTo(input.value.trim());
}

// Event listeners
goBtn.onclick = openProxy;
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") openProxy();
});

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
});

taskbar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") navigateTo(taskbar.value.trim());
});

backBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    loadURL(historyStack[currentIndex]);
  }
});

forwardBtn.addEventListener("click", () => {
  if (currentIndex < historyStack.length - 1) {
    currentIndex++;
    loadURL(historyStack[currentIndex]);
  }
});

homeBtn.addEventListener("click", () => {
  proxy.style.display = "none";
  home.style.display = "flex";
  frame.src = "about:blank"; // clear iframe content
  input.focus();
});

// Initialize dark mode from toggle state on page load
if (toggle.checked) {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}
