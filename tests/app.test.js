import { describe, it, expect } from "vitest";
import { getCharacterById, getCharacterList, CHARACTERS } from "../src/characters.js";

describe("characters.js", () => {
  it("getCharacterList devuelve los 3 personajes", () => {
    expect(getCharacterList()).toHaveLength(3);
  });

  it("getCharacterById devuelve el personaje correcto", () => {
    const jarvis = getCharacterById("jarvis");
    expect(jarvis.name).toBe("J.A.R.V.I.S.");
  });

  it("getCharacterById devuelve null si el id no existe", () => {
    expect(getCharacterById("no-existe")).toBeNull();
  });

  it("cada personaje tiene systemPrompt y theme definidos", () => {
    Object.values(CHARACTERS).forEach((character) => {
      expect(character.systemPrompt).toBeTruthy();
      expect(character.theme).toBeTruthy();
    });
  });
});