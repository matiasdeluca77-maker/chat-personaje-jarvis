import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chat.js";
import { renderAbout } from "./views/about.js";

const app = document.getElementById("app");

// Mapa de rutas: cada path apunta a la función que dibuja esa vista
const routes = {
  "/home": renderHome,
  "/chat": renderChat,
  "/about": renderAbout,
};

// Dibuja la vista según la URL actual
function router() {
  const path = window.location.pathname === "/" ? "/home" : window.location.pathname;
  const renderView = routes[path] || renderHome;
  app.innerHTML = "";
  renderView(app);
  updateActiveLink(path);
}

// Resalta el link del menú que corresponde a la vista actual
function updateActiveLink(path) {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    link.classList.toggle("active", linkPath === path);
  });
}

// Navega a una ruta nueva sin recargar la página
function navigateTo(path) {
  window.history.pushState({}, "", path);
  router();
}

// Interceptamos todos los clicks en links con data-link
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigateTo(link.getAttribute("href"));
  }
});

// Los botones back/forward del navegador disparan "popstate"
window.addEventListener("popstate", router);

// Primera carga de la página
router();