// Vercel Serverless Function.
// Recibe: { characterId, message, history }
// Hace: llama a Gemini con la API key guardada en el servidor (nunca en el cliente)
// Devuelve: { reply: "texto de la respuesta del personaje" }

import { CHARACTERS } from "../src/characters.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

export default async function handler(req, res) {
  // Solo aceptamos POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { characterId, message, history } = req.body;

    // Validaciones básicas
    if (!characterId || !message) {
      return res
        .status(400)
        .json({ error: "Faltan datos: characterId y message son requeridos" });
    }

    const character = CHARACTERS[characterId];
    if (!character) {
      return res.status(400).json({ error: "Personaje no válido" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "Falta configurar la API key en el servidor" });
    }

    // Armamos el historial en el formato que espera Gemini.
    const contents = [];

    if (Array.isArray(history)) {
      for (const turn of history) {
        contents.push({
          role: turn.role === "assistant" ? "model" : "user",
          parts: [{ text: turn.text }],
        });
      }
    }

    // Agregamos el mensaje nuevo del usuario
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const body = {
      contents,
      systemInstruction: {
        parts: [{ text: character.systemPrompt }],
      },
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 300,
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    };

    const geminiResponse = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text();
      console.error("Error de Gemini:", errorData);
      return res
        .status(502)
        .json({ error: "Error al comunicarse con Gemini AI" });
    }

    const data = await geminiResponse.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No pude generar una respuesta en este momento.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Error en la función serverless:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}