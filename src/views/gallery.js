import { getCharacterList } from "../characters.js";
import { setActiveCharacter } from "../state.js";

export function renderGallery(container) {
  document.body.removeAttribute("data-world");

  const characters = getCharacterList();

  container.innerHTML = `
    <section class="gallery">
      <h1>Elegí con quién chatear</h1>
      <div class="gallery__grid">
        ${characters.map(cardHTML).join("")}
      </div>
    </section>
  `;

  container.querySelectorAll("[data-character-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-character-id");
      setActiveCharacter(id);
      window.history.pushState({}, "", "/chat");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  });
}

function cardHTML(character) {
  return `
    <article
      class="character-card"
      data-character-id="${character.id}"
      style="--card-color: ${character.theme.primary}"
    >
      <span class="character-card__avatar">${character.avatar}</span>
      <h2>${character.name}</h2>
      <p>${character.tagline}</p>
      <span class="character-card__world">${character.worldLabel}</span>
      <span class="character-card__btn">Chatear</span>
    </article>
  `;
}