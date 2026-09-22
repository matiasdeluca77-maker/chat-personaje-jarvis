export function renderHome(container) {
  container.innerHTML = `
    <section class="home">
      <h1>Chateá con J.A.R.V.I.S.</h1>
      <p class="home__desc">
        La inteligencia artificial de Tony Stark. Formal, eficiente y con un humor
        británico muy particular. Preguntale lo que quieras.
      </p>
      <a href="/chat" data-link class="btn-primary">Empezar a chatear</a>
    </section>
  `;
}