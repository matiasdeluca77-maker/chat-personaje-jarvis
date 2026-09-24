import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isValidMessage,
  formatTimestamp,
  buildRequestBody,
  sendMessageToAPI,
} from "../src/utils.js";

describe("isValidMessage", () => {
  it("rechaza mensajes vacíos o solo espacios", () => {
    expect(isValidMessage("")).toBe(false);
    expect(isValidMessage("   ")).toBe(false);
  });

  it("acepta mensajes con texto real", () => {
    expect(isValidMessage("Hola, quién sos?")).toBe(true);
  });
});

describe("formatTimestamp", () => {
  it("devuelve un string con formato de hora", () => {
    const result = formatTimestamp(new Date("2026-01-01T15:30:00"));
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("buildRequestBody", () => {
  it("arma el body con los datos correctos", () => {
    const body = buildRequestBody("jarvis", "Hola", []);
    expect(body).toEqual({ characterId: "jarvis", message: "Hola", history: [] });
  });

  it("usa un array vacío si history no es válido", () => {
    const body = buildRequestBody("goku", "Hola", undefined);
    expect(body.history).toEqual([]);
  });
});

describe("sendMessageToAPI", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("devuelve el reply cuando la API responde bien", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Soy J.A.R.V.I.S., señor." }),
    });

    const reply = await sendMessageToAPI("jarvis", "Hola", []);

    expect(reply).toBe("Soy J.A.R.V.I.S., señor.");
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/functions",
      expect.objectContaining({ method: "POST" })
    );
  });

  it("lanza un error cuando la API responde con un status de error", async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(sendMessageToAPI("jarvis", "Hola", [])).rejects.toThrow();
  });
});