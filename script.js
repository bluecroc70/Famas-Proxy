const homeScreen = document.getElementById("homeScreen");
const proxyScreen = document.getElementById("proxyScreen");
const urlInput = document.getElementById("urlInput");
const goButton = document.getElementById("goButton");
const darkModeToggle = document.getElementById("darkModeToggle");

const browserBar = document.getElementById("browserBar");
const proxyUrlInput = document.getElementById("proxyUrl");
const goBtn = document.getElementById("goBtn");
const proxyIframe = document.getElementById("proxyIframe");
const homeBtn = document.getElementById("homeBtn");

// Restore your working search logic:
function formatUrl(input) {
  input = input.trim();

  // If input doesn't start with http/https, add https://
  if (!input.match(/^https?:\/\//i)) {
    input = "https://" + input;
  }

  // Check if input looks like a full URL with domain extension
  // We'll check common TLDs for simplicity (.com, .org, .net, .io, etc.)
  const tldRegex = /\.[a-z]{2,}$/i;
  if (!tldRegex.test(input)) {
    // Not a URL, treat as search query
    input = `https://duckduckgo.com/?q=${encodeURIComponent(input.replace(/^https?:\/\//i, ''))}`;
  }

  return input;
}

function openProxy(url) {
  url = formatUrl(url);
  proxyIframe.src = url;
  proxyUrlInput.value = url;
  homeScreen.style.display = "none";
  proxyScreen.style.display = "block";
}

goButton.addEventListener("click", () => {
  if (urlInput.value.trim() === "") return;
  openProxy(urlInput.value);
});

urlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && urlInput.value.trim() !== "") {
    openProxy(urlInput.value);
  }
});

goBtn.addEventListener("click", () => {
  if (proxyUrlInput.value.trim() === "") return;
  openProxy(proxyUrlInput.value);
});

proxyUrlInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && proxyUrlInput.value.trim() !== "") {
    openProxy(proxyUrlInput.value);
  }
});

homeBtn.addEventListener("click", () => {
  proxyIframe.src = "";
  proxyScreen.style.display = "none";
  homeScreen.style.display = "flex";
  urlInput.value = "";
});

// Dark mode toggle handling with localStorage
if (localStorage.getItem("darkMode") === "false") {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  darkModeToggle.checked = false;
} else {
  document.body.classList.add("dark");
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {
  if (darkModeToggle.checked) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("darkMode", "false");
  }
});
