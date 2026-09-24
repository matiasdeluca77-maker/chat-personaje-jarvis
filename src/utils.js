// Funciones puras, testeables sin DOM ni navegador.

export function isValidMessage(text) {
  return typeof text === "string" && text.trim().length > 0;
}

export function formatTimestamp(date = new Date()) {
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buildRequestBody(characterId, message, history) {
  return {
    characterId,
    message,
    history: Array.isArray(history) ? history : [],
  };
}

// Llama a nuestra función serverless (nunca a Gemini directamente)
export async function sendMessageToAPI(characterId, message, history) {
  const response = await fetch("/api/functions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildRequestBody(characterId, message, history)),
  });

  if (!response.ok) {
    throw new Error(`Error del servidor: ${response.status}`);
  }

  const data = await response.json();
  return data.reply;
}