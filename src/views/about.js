export function renderAbout(container) {
  document.body.removeAttribute("data-world");

  container.innerHTML = `
    <section class="about">
      <h1>Sobre este proyecto</h1>
      <p>
        Esta aplicación es un proyecto integrador que permite chatear con
        distintos personajes ficticios (J.A.R.V.I.S., Spider-Man y Goku) usando
        Google Gemini AI como motor de conversación.
      </p>
      <p>
        Fue construida como Single Page Application, con routing propio usando
        la History API del navegador, y se conecta a Gemini de forma segura a
        través de una función serverless de Vercel, para no exponer la API key.
      </p>
    </section>
  `;
}