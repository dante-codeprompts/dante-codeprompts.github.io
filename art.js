// ============================================================
// CYBERCELL: LIFE PROTOCOL — визуальная библиотека
// ============================================================

const ART = {

  portraits: {

    sai: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
      <path d="M 30 78 Q 26 88 24 100 L 56 100 Q 54 88 50 78 Z" fill="#0a0e0f"/>
      <path d="M 20 32 Q 18 12 40 10 Q 62 12 60 32 Q 63 50 58 68 Q 55 78 40 80 Q 25 78 22 68 Q 17 50 20 32 Z" fill="#0a0e0f"/>
      <path d="M 17 38 Q 14 18 40 8 Q 66 18 63 38 Q 60 30 55 26 Q 48 22 40 22 Q 32 22 25 26 Q 20 30 17 38 Z" fill="#18282b"/>
      <path d="M 52 22 Q 58 28 58 42 L 56 40 Q 55 30 50 24 Z" fill="#0f1517"/>
      <path d="M 20 32 Q 18 15 32 11" stroke="#00ff9d" stroke-width="0.8" fill="none" opacity="0.8"/>
      <ellipse cx="32" cy="46" rx="2.5" ry="1.3" fill="#00ff9d"/>
      <ellipse cx="48" cy="46" rx="2.5" ry="1.3" fill="#00ff9d"/>
      <ellipse cx="32" cy="46" rx="4" ry="2.5" fill="#00ff9d" opacity="0.2"/>
      <ellipse cx="48" cy="46" rx="4" ry="2.5" fill="#00ff9d" opacity="0.2"/>
      <path d="M 28 56 L 38 60 M 42 60 L 52 56" stroke="#00ff9d" stroke-width="0.4" opacity="0.5"/>
      <path d="M 30 80 L 28 95 M 50 80 L 52 95" stroke="#0a0e0f" stroke-width="6"/>
      <path d="M 24 88 L 56 88" stroke="#1a2a2d" stroke-width="1"/>
    </svg>`,

    kestrel: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
      <path d="M 30 78 Q 26 88 24 100 L 56 100 Q 54 88 50 78 Z" fill="#0a0e0f"/>
      <path d="M 22 30 Q 20 12 40 10 Q 60 12 58 30 Q 60 50 56 66 Q 53 78 40 80 Q 27 78 24 66 Q 20 50 22 30 Z" fill="#0a0e0f"/>
      <path d="M 18 34 Q 16 14 40 8 Q 64 14 62 34 Q 58 24 48 22 Q 45 26 40 26 Q 35 26 32 22 Q 22 24 18 34 Z" fill="#151220"/>
      <path d="M 22 30 Q 20 14 30 10" stroke="#a78bfa" stroke-width="0.8" fill="none" opacity="0.8"/>
      <path d="M 58 30 Q 60 14 50 10" stroke="#a78bfa" stroke-width="0.5" fill="none" opacity="0.4"/>
      <path d="M 30 44 L 38 44 M 42 44 L 50 44" stroke="#a78bfa" stroke-width="1.5"/>
      <ellipse cx="34" cy="44" rx="2" ry="1.2" fill="#a78bfa"/>
      <ellipse cx="46" cy="44" rx="2" ry="1.2" fill="#a78bfa"/>
      <path d="M 40 52 L 40 62" stroke="#a78bfa" stroke-width="0.5" opacity="0.5"/>
      <path d="M 30 80 L 28 95 M 50 80 L 52 95" stroke="#0a0e0f" stroke-width="6"/>
      <path d="M 20 86 L 32 90 M 60 86 L 48 90" stroke="#1a2a2d" stroke-width="0.8"/>
    </svg>`,

    mira: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
      <path d="M 30 78 Q 26 88 24 100 L 56 100 Q 54 88 50 78 Z" fill="#0a0e0f"/>
      <path d="M 22 32 Q 20 12 40 10 Q 60 12 58 32 Q 60 52 56 68 Q 53 78 40 80 Q 27 78 24 68 Q 20 52 22 32 Z" fill="#0a0e0f"/>
      <path d="M 20 34 Q 18 16 40 10 Q 62 16 60 34 Q 58 28 55 24 Q 48 20 40 20 Q 32 20 25 24 Q 22 28 20 34 Z" fill="#0f1a1f"/>
      <path d="M 20 34 Q 18 16 30 12" stroke="#4dd0e1" stroke-width="0.8" fill="none" opacity="0.7"/>
      <path d="M 60 34 Q 62 16 50 12" stroke="#4dd0e1" stroke-width="0.8" fill="none" opacity="0.7"/>
      <rect x="30" y="42" width="8" height="4" rx="1" fill="#0a0e0f" stroke="#4dd0e1" stroke-width="0.5"/>
      <rect x="42" y="42" width="8" height="4" rx="1" fill="#0a0e0f" stroke="#4dd0e1" stroke-width="0.5"/>
      <circle cx="34" cy="44" r="1.2" fill="#4dd0e1"/>
      <circle cx="46" cy="44" r="1.2" fill="#4dd0e1"/>
      <path d="M 32 58 Q 40 62 48 58" stroke="#4dd0e1" stroke-width="0.4" opacity="0.6" fill="none"/>
      <path d="M 30 80 L 28 95 M 50 80 L 52 95" stroke="#0a0e0f" stroke-width="6"/>
      <path d="M 28 82 L 52 82" stroke="#4dd0e1" stroke-width="0.6" opacity="0.5"/>
      <path d="M 40 82 L 40 88" stroke="#4dd0e1" stroke-width="0.4" opacity="0.5"/>
    </svg>`,

    claw: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
      <path d="M 30 78 Q 26 88 24 100 L 56 100 Q 54 88 50 78 Z" fill="#0a0e0f"/>
      <path d="M 20 32 Q 18 12 40 10 Q 60 12 60 32 Q 62 52 58 68 Q 55 78 40 80 Q 25 78 22 68 Q 18 52 20 32 Z" fill="#0a0e0f"/>
      <path d="M 16 36 Q 14 14 40 8 Q 66 14 64 36 Q 60 26 52 22 Q 46 20 40 20 Q 34 20 28 22 Q 20 26 16 36 Z" fill="#2a0f14"/>
      <path d="M 20 32 Q 18 14 30 10" stroke="#ff2a55" stroke-width="0.8" fill="none" opacity="0.8"/>
      <path d="M 60 32 Q 62 14 50 10" stroke="#ff2a55" stroke-width="0.5" fill="none" opacity="0.4"/>
      <ellipse cx="32" cy="46" rx="2.5" ry="1.3" fill="#ff2a55"/>
      <ellipse cx="48" cy="46" rx="2.5" ry="1.3" fill="#ff2a55"/>
      <path d="M 30 56 L 50 60" stroke="#ff2a55" stroke-width="0.5" opacity="0.6"/>
      <path d="M 30 80 L 28 95 M 50 80 L 52 95" stroke="#0a0e0f" stroke-width="6"/>
      <path d="M 22 84 L 34 88" stroke="#ff2a55" stroke-width="0.4" opacity="0.5"/>
    </svg>`,

    player: `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg" class="portrait-svg">
      <path d="M 30 78 Q 26 88 24 100 L 56 100 Q 54 88 50 78 Z" fill="#0a0e0f"/>
      <path d="M 22 32 Q 20 12 40 10 Q 60 12 58 32 Q 60 50 56 68 Q 53 78 40 80 Q 27 78 24 68 Q 20 50 22 32 Z" fill="#0a0e0f"/>
      <path d="M 20 36 Q 18 14 40 10 Q 62 14 60 36 Q 56 28 50 24 Q 44 22 40 22 Q 36 22 30 24 Q 24 28 20 36 Z" fill="#1a2a2d"/>
      <path d="M 22 32 Q 20 14 32 11" stroke="#ff8c1a" stroke-width="0.6" fill="none" opacity="0.6"/>
      <ellipse cx="32" cy="46" rx="2.2" ry="1.2" fill="#ff8c1a"/>
      <ellipse cx="48" cy="46" rx="2.2" ry="1.2" fill="#ff8c1a"/>
      <path d="M 30 56 L 40 58 L 50 56" stroke="#ff8c1a" stroke-width="0.4" opacity="0.4" fill="none"/>
      <path d="M 30 80 L 28 95 M 50 80 L 52 95" stroke="#0a0e0f" stroke-width="6"/>
    </svg>`,
  },

  cutscenes: {

    vign_1: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" class="cutscene-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="v1sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a0e0f"/>
          <stop offset="0.5" stop-color="#1a1030"/>
          <stop offset="1" stop-color="#4a2040"/>
        </linearGradient>
        <linearGradient id="v1glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#ff8c1a" stop-opacity="0.7"/>
          <stop offset="1" stop-color="#ff8c1a" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="300" height="180" fill="url(#v1sky)"/>
      <rect y="80" width="300" height="100" fill="url(#v1glow)" opacity="0.5"/>
      <g opacity="0.9">
        <rect x="20" y="60" width="14" height="120" fill="#05080a"/>
        <rect x="38" y="40" width="20" height="140" fill="#05080a"/>
        <rect x="62" y="70" width="12" height="110" fill="#05080a"/>
        <rect x="78" y="30" width="24" height="150" fill="#05080a"/>
        <rect x="106" y="55" width="16" height="125" fill="#05080a"/>
        <rect x="126" y="20" width="22" height="160" fill="#05080a"/>
        <rect x="152" y="65" width="14" height="115" fill="#05080a"/>
        <rect x="170" y="45" width="18" height="135" fill="#05080a"/>
        <rect x="192" y="75" width="12" height="105" fill="#05080a"/>
        <rect x="208" y="35" width="20" height="145" fill="#05080a"/>
        <rect x="232" y="60" width="16" height="120" fill="#05080a"/>
        <rect x="252" y="25" width="22" height="155" fill="#05080a"/>
        <rect x="278" y="70" width="14" height="110" fill="#05080a"/>
      </g>
      <g fill="#00ff9d" opacity="0.7">
        <rect x="42" y="48" width="2" height="2"/><rect x="48" y="58" width="2" height="2"/>
        <rect x="84" y="42" width="2" height="2"/><rect x="90" y="66" width="2" height="2"/>
        <rect x="132" y="32" width="2" height="2"/><rect x="140" y="72" width="2" height="2"/>
        <rect x="216" y="48" width="2" height="2"/><rect x="220" y="88" width="2" height="2"/>
        <rect x="258" y="38" width="2" height="2"/><rect x="264" y="68" width="2" height="2"/>
      </g>
      <g fill="#ff8c1a" opacity="0.6">
        <rect x="68" y="80" width="2" height="2"/><rect x="112" y="70" width="2" height="2"/>
        <rect x="160" y="78" width="2" height="2"/><rect x="198" y="88" width="2" height="2"/>
        <rect x="238" y="70" width="2" height="2"/>
      </g>
      <ellipse cx="150" cy="180" rx="180" ry="20" fill="#000" opacity="0.6"/>
    </svg>`,

    vign_2: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" class="cutscene-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="v2water" cx="0.5" cy="0.7" r="0.7">
          <stop offset="0" stop-color="#0a2028"/>
          <stop offset="1" stop-color="#05080a"/>
        </radialGradient>
      </defs>
      <rect width="300" height="180" fill="#05080a"/>
      <rect y="80" width="300" height="100" fill="url(#v2water)"/>
      <ellipse cx="150" cy="80" rx="60" ry="6" fill="none" stroke="#4dd0e1" stroke-width="0.5" opacity="0.4"/>
      <ellipse cx="150" cy="80" rx="100" ry="10" fill="none" stroke="#4dd0e1" stroke-width="0.5" opacity="0.25"/>
      <ellipse cx="150" cy="80" rx="140" ry="14" fill="none" stroke="#4dd0e1" stroke-width="0.5" opacity="0.15"/>
      <circle cx="150" cy="70" r="3" fill="#ff8c1a" opacity="0.6"/>
      <rect x="148" y="30" width="1" height="40" fill="#ff8c1a" opacity="0.15"/>
    </svg>`,

    vign_3: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" class="cutscene-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="v3sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1a0808"/>
          <stop offset="1" stop-color="#4a1a1a"/>
        </linearGradient>
      </defs>
      <rect width="300" height="180" fill="url(#v3sky)"/>
      <circle cx="150" cy="130" r="25" fill="#ff8c1a" opacity="0.4"/>
      <circle cx="150" cy="130" r="15" fill="#ffcc66" opacity="0.3"/>
      <g fill="#05080a">
        <rect x="0" y="140" width="300" height="40"/>
        <rect x="30" y="100" width="30" height="80"/>
        <rect x="80" y="80" width="20" height="100"/>
        <rect x="120" y="110" width="15" height="70"/>
        <rect x="180" y="90" width="22" height="90"/>
        <rect x="220" y="120" width="18" height="60"/>
        <rect x="260" y="95" width="25" height="85"/>
      </g>
      <circle cx="180" cy="20" r="1" fill="#fff" opacity="0.6"/>
      <circle cx="200" cy="35" r="0.8" fill="#fff" opacity="0.4"/>
      <circle cx="90" cy="25" r="0.8" fill="#fff" opacity="0.5"/>
      <path d="M 148 100 Q 150 90 152 100 Q 150 95 148 100" fill="#fff" opacity="0.5"/>
      <path d="M 148 100 Q 150 110 152 100" fill="#ff8c1a" opacity="0.7"/>
    </svg>`,

    vign_4: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" class="cutscene-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="v4sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#0a1420"/>
          <stop offset="1" stop-color="#1a2838"/>
        </linearGradient>
      </defs>
      <rect width="300" height="180" fill="url(#v4sky)"/>
      <g stroke="#4dd0e1" stroke-width="0.5" opacity="0.4">
        <line x1="30" y1="20" x2="20" y2="60"/>
        <line x1="60" y1="10" x2="50" y2="80"/>
        <line x1="90" y1="30" x2="80" y2="100"/>
        <line x1="120" y1="15" x2="110" y2="70"/>
        <line x1="180" y1="20" x2="170" y2="90"/>
        <line x1="210" y1="40" x2="200" y2="110"/>
        <line x1="250" y1="10" x2="240" y2="60"/>
        <line x1="280" y1="30" x2="270" y2="100"/>
      </g>
      <ellipse cx="150" cy="170" rx="120" ry="10" fill="#4dd0e1" opacity="0.15"/>
      <ellipse cx="150" cy="170" rx="80" ry="6" fill="#4dd0e1" opacity="0.25"/>
      <rect x="0" y="150" width="300" height="30" fill="#05080a"/>
      <rect x="60" y="120" width="30" height="50" fill="#1a2a2d" opacity="0.7"/>
      <rect x="210" y="125" width="25" height="45" fill="#1a2a2d" opacity="0.7"/>
    </svg>`,

    vign_5: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" class="cutscene-svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="v5temple" cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stop-color="#2a0a1a"/>
          <stop offset="1" stop-color="#0a0e0f"/>
        </radialGradient>
      </defs>
      <rect width="300" height="180" fill="url(#v5temple)"/>
      <ellipse cx="150" cy="90" rx="60" ry="60" fill="#f472b6" opacity="0.15"/>
      <ellipse cx="150" cy="90" rx="40" ry="40" fill="#f472b6" opacity="0.25"/>
      <ellipse cx="150" cy="90" rx="20" ry="20" fill="#f472b6" opacity="0.4"/>
      <circle cx="150" cy="90" r="5" fill="#fff" opacity="0.8"/>
      <path d="M 100 140 Q 150 100 200 140" stroke="#f472b6" stroke-width="0.5" fill="none" opacity="0.6"/>
      <path d="M 90 160 Q 150 120 210 160" stroke="#f472b6" stroke-width="0.5" fill="none" opacity="0.4"/>
      <path d="M 80 180 Q 150 140 220 180" stroke="#f472b6" stroke-width="0.5" fill="none" opacity="0.2"/>
      <rect x="140" y="20" width="20" height="60" fill="#0a0e0f" opacity="0.8"/>
      <path d="M 130 20 L 150 5 L 170 20 Z" fill="#f472b6" opacity="0.5"/>
    </svg>`,

    vign_6: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" class="cutscene-svg" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="180" fill="#0a0e0f"/>
      <rect x="40" y="20" width="220" height="160" fill="#1a1f22" opacity="0.5"/>
      <rect x="60" y="40" width="180" height="120" fill="#0a0e0f"/>
      <rect x="60" y="40" width="180" height="4" fill="#4dd0e1" opacity="0.5"/>
      <rect x="60" y="156" width="180" height="4" fill="#4dd0e1" opacity="0.3"/>
      <line x1="90" y1="40" x2="90" y2="160" stroke="#2a4a4d" stroke-width="0.5"/>
      <circle cx="90" cy="100" r="10" fill="#ff8c1a" opacity="0.5"/>
      <circle cx="90" cy="100" r="3" fill="#ffcc66"/>
      <circle cx="210" cy="60" r="8" fill="#00ff9d" opacity="0.4"/>
      <circle cx="210" cy="60" r="2" fill="#00ff9d"/>
      <circle cx="210" cy="140" r="6" fill="#ff2a55" opacity="0.5"/>
      <circle cx="210" cy="140" r="2" fill="#ff2a55"/>
      <g fill="#4dd0e1" opacity="0.4">
        <text x="120" y="80" font-family="monospace" font-size="8">7→12</text>
        <text x="120" y="95" font-family="monospace" font-size="8">▲▲▼▲▼</text>
        <text x="120" y="110" font-family="monospace" font-size="8">1 1 0 1 1 0 1</text>
      </g>
    </svg>`,
  },

  locations: {
    apartment: { label: "Капсула 7-Б",         icon: "▣" },
    street:    { label: "Улица Нижнего Яруса", icon: "◆" },
    work:      { label: "Департамент Учёта",   icon: "▤" },
    bar:       { label: "«Последний бит»",     icon: "◈" },
    roof:      { label: "Крыша блока",         icon: "▲" },
    temple:    { label: "Храм Лотоса",         icon: "☸" },
    tunnels:   { label: "Тоннели",             icon: "▽" },
  },
};

function getPortraitForCard(card) {
  if (!card || !card.cat) return null;
  const c = card.cat.toLowerCase();
  if (c.indexOf("сай") >= 0)     return ART.portraits.sai;
  if (c.indexOf("кестрел") >= 0) return ART.portraits.kestrel;
  if (c.indexOf("мира") >= 0)    return ART.portraits.mira;
  if (c.indexOf("коготь") >= 0)  return ART.portraits.claw;
  return null;
}

function getSceneForCard(card, state) {
  if (card && card.req && card.req.location && card.req.location.length) {
    return card.req.location[0];
  }
  return state.location || "apartment";
}
