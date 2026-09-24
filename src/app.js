import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chat.js";
import { renderAbout } from "./views/about.js";
import { renderGallery } from "./views/gallery.js";

const app = document.getElementById("app");

const routes = {
  "/home": renderHome,
  "/chat": renderChat,
  "/about": renderAbout,
  "/gallery": renderGallery,
};

function router() {
  const path = window.location.pathname === "/" ? "/home" : window.location.pathname;
  const renderView = routes[path] || renderHome;
  app.innerHTML = "";
  renderView(app);
  updateActiveLink(path);
}

function updateActiveLink(path) {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    link.classList.toggle("active", linkPath === path);
  });
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  router();
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigateTo(link.getAttribute("href"));
  }
});

window.addEventListener("popstate", router);

router();