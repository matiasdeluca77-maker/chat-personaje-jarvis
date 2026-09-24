export function renderHome(container) {
  document.body.removeAttribute("data-world");

  container.innerHTML = `
    <section class="home">
      <h1>Chateá con tu personaje favorito</h1>
      <p class="home__desc">
        Elegí entre J.A.R.V.I.S., Spider-Man o Goku, y charlá con ellos gracias a
        Google Gemini AI. Cada uno responde con su propia personalidad.
      </p>
      <a href="/gallery" data-link class="btn-primary">Empezar a chatear</a>
    </section>
  `;
}