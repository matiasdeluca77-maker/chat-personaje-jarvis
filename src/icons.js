// Íconos SVG originales por personaje — formas abstractas/geométricas
// que evocan a cada uno, sin usar logos ni arte con copyright.

function jarvisIcon() {
  return `
    <svg viewBox="0 0 100 100" class="icon-jarvis">
      <circle cx="50" cy="50" r="42" fill="none" stroke="#4da3ff" stroke-width="2" opacity="0.35"/>
      <g class="ring">
        <circle cx="50" cy="50" r="30" fill="none" stroke="#7fd4ff" stroke-width="2" stroke-dasharray="4 7"/>
      </g>
      <circle cx="50" cy="50" r="19" fill="#0a1a2e" stroke="#4da3ff" stroke-width="1.5"/>
      <circle class="core" cx="50" cy="50" r="7" fill="#4da3ff"/>
      <g stroke="#7fd4ff" stroke-width="2.5" stroke-linecap="round">
        <line x1="50" y1="5" x2="50" y2="14"/>
        <line x1="50" y1="86" x2="50" y2="95"/>
        <line x1="5" y1="50" x2="14" y2="50"/>
        <line x1="86" y1="50" x2="95" y2="50"/>
      </g>
    </svg>
  `;
}

function spidermanIcon() {
  return `
    <svg viewBox="0 0 100 100" class="icon-spiderman">
      <g class="web-swing">
        <circle cx="50" cy="50" r="44" fill="none" stroke="#e23636" stroke-width="1" opacity="0.4"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#e23636" stroke-width="1" opacity="0.4"/>
        <circle cx="50" cy="50" r="16" fill="none" stroke="#e23636" stroke-width="1" opacity="0.4"/>
        <line x1="50" y1="6" x2="50" y2="94" stroke="#e23636" stroke-width="1" opacity="0.5"/>
        <line x1="6" y1="50" x2="94" y2="50" stroke="#e23636" stroke-width="1" opacity="0.5"/>
        <line x1="18" y1="18" x2="82" y2="82" stroke="#e23636" stroke-width="1" opacity="0.5"/>
        <line x1="82" y1="18" x2="18" y2="82" stroke="#e23636" stroke-width="1" opacity="0.5"/>
        <ellipse cx="50" cy="48" rx="8" ry="11" fill="#14142c" stroke="#e23636" stroke-width="1"/>
        <circle cx="50" cy="34" r="5" fill="#14142c" stroke="#e23636" stroke-width="1"/>
        <g stroke="#14142c" stroke-width="2" stroke-linecap="round" fill="none">
          <path d="M44 42 L28 32"/>
          <path d="M44 48 L24 46"/>
          <path d="M44 54 L26 60"/>
          <path d="M56 42 L72 32"/>
          <path d="M56 48 L76 46"/>
          <path d="M56 54 L74 60"/>
        </g>
      </g>
    </svg>
  `;
}

function gokuIcon() {
  return `
    <svg viewBox="0 0 100 100" class="icon-goku">
      <defs>
        <radialGradient id="gokuCore" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stop-color="#FFE9B0"/>
          <stop offset="45%" stop-color="#FF8C1A"/>
          <stop offset="100%" stop-color="#B85400"/>
        </radialGradient>
      </defs>
      <g class="spikes" fill="#FFD447">
        <polygon points="50,4 56,27 44,27"/>
        <polygon points="73,10 70,33 59,24"/>
        <polygon points="27,10 41,24 30,33"/>
        <polygon points="90,32 75,41 78,27"/>
        <polygon points="10,32 25,27 22,41"/>
        <polygon points="95,58 77,56 85,46"/>
        <polygon points="5,58 15,46 23,56"/>
      </g>
      <circle cx="50" cy="53" r="25" fill="url(#gokuCore)" stroke="#B85400" stroke-width="1.5"/>
    </svg>
  `;
}

const ICONS = {
  jarvis: jarvisIcon,
  spiderman: spidermanIcon,
  goku: gokuIcon,
};

export function getCharacterIcon(id) {
  const iconFn = ICONS[id];
  return iconFn ? iconFn() : "";
}