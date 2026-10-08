// ============================================================
// CYBERCELL: LIFE PROTOCOL — движок
// ============================================================

const SAVE_KEY = "cybercell_save_v3";

function newState() {
  return {
    day: 1,
    phase: "morning",
    stats: { health: 100, stress: 20, clarity: 50, hunger: 30 },
    cyber: 0,
    credits: 80,
    flags: {},
    counters: {},
    rel: { v: 0, kestrel: 0, mira: 0 },
    factions: { ether: 0, claw: 0, stream: 0, lotus: 0, free: 0 },
    location: "apartment",
    usedOnce: [],
    cooldowns: {},
    scheduled: [],
    log: [],
    ended: false,
    pendingCard: null,
  };
}

let S = newState();
let busy = false;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function log(msg, cls = "") {
  S.log.unshift({ msg, cls, day: S.day, phase: S.phase });
  if (S.log.length > 30) S.log.pop();
}

function checkReq(req, s) {
  if (!req) return true;
  if (req.day_exact !== undefined && s.day !== req.day_exact) return false;
  if (req.phase && !req.phase.includes(s.phase)) return false;
  if (req.location && !req.location.includes(s.location)) return false;
  if (req.day_min !== undefined && s.day < req.day_min) return false;
  if (req.cyber_min !== undefined && s.cyber < req.cyber_min) return false;
  if (req.cyber_max !== undefined && s.cyber > req.cyber_max) return false;
  if (req.flag) for (const k in req.flag) {
    if ((s.flags[k] || false) !== req.flag[k]) return false;
  }
  if (req.rel) for (const k in req.rel) {
    const v = s.rel[k] || 0;
    if (typeof req.rel[k] === "number" && v < req.rel[k]) return false;
  }
  if (req.faction) for (const k in req.faction) {
    const v = s.factions[k] || 0;
    if (typeof req.faction[k] === "number" && v < req.faction[k]) return false;
  }
  return true;
}

function applyEffects(e) {
  if (!e) return;
  if (e.stats) for (const k in e.stats) {
    S.stats[k] = clamp((S.stats[k] || 0) + e.stats[k], 0, 100);
  }
  if (e.credits) S.credits = Math.max(0, S.credits + e.credits);
  if (e.cyber)   S.cyber = clamp(S.cyber + e.cyber, 0, 100);
  if (e.flags_set)    for (const k in e.flags_set) S.flags[k] = e.flags_set[k];
  if (e.flags_remove) for (const k of e.flags_remove) delete S.flags[k];
  if (e.rel)     for (const k in e.rel)     S.rel[k]     = clamp((S.rel[k] || 0) + e.rel[k], -100, 100);
  if (e.faction) for (const k in e.faction) S.factions[k] = clamp((S.factions[k] || 0) + e.faction[k], -100, 100);
  if (e.counter) for (const k in e.counter) S.counters[k] = (S.counters[k] || 0) + e.counter[k];
}

// Обязательная сюжетная карточка — приоритет над свободным пулом
function pickStoryCard() {
  return CARDS.find(c =>
    c.story === true &&
    !S.usedOnce.includes(c.id) &&
    checkReq(c.req, S)
  ) || null;
}

function pickFreeCard() {
  const pool = CARDS.filter(c => {
    if (c.story) return false;
    if (c.once && S.usedOnce.includes(c.id)) return false;
    if (c.cd && S.cooldowns[c.id] && S.cooldowns[c.id] > S.day) return false;
    return checkReq(c.req, S);
  });
  if (!pool.length) return null;
  const total = pool.reduce((sum, c) => sum + (c.w || 10), 0);
  let r = Math.random() * total;
  for (const c of pool) {
    r -= (c.w || 10);
    if (r <= 0) return c;
  }
  return pool[pool.length - 1];
}

const PHASES = ["morning", "midday", "evening", "night"];
const PHASE_NAMES = { morning: "Утро", midday: "День", evening: "Вечер", night: "Ночь" };
const PHASE_ICONS = { morning: "☀", midday: "●", evening: "◐", night: "☾" };

function advancePhase() {
  if (busy) return;
  if (S.pendingCard) {
    if (S.pendingCard.once) S.usedOnce.push(S.pendingCard.id);
    if (S.pendingCard.cd)   S.cooldowns[S.pendingCard.id] = S.day + S.pendingCard.cd;
    S.pendingCard = null;
  }

  const idx = PHASES.indexOf(S.phase);
  if (idx < PHASES.length - 1) {
    S.phase = PHASES[idx + 1];
    checkEnding();
    render();
  } else {
    newDay();
  }
}

function newDay() {
  S.day += 1;
  S.phase = "morning";

  // Ежедневные расходы
  S.credits = Math.max(0, S.credits - 15);
  if (S.credits <= 0) {
    S.stats.stress = clamp(S.stats.stress + 10, 0, 100);
    log("Нечем платить за капсулу. Стресс +10", "danger");
  }

  // Голод
  S.stats.hunger = clamp(S.stats.hunger + 20, 0, 100);
  if (S.stats.hunger >= 100) {
    S.stats.health = clamp(S.stats.health - 20, 0, 100);
    log("Голод критичен. Здоровье -20", "danger");
  } else if (S.stats.hunger > 70) {
    S.stats.health = clamp(S.stats.health - 5, 0, 100);
    log("Ты голоден. Здоровье -5", "amber");
  }

  // Стресс высокий — снижает здоровье
  if (S.stats.stress > 80) {
    S.stats.health = clamp(S.stats.health - 8, 0, 100);
    log("Стресс разрушает тело. Здоровье -8", "danger");
  }

  // Естественное снижение киберпсихоза
  if (S.cyber > 0) S.cyber = clamp(S.cyber - 1, 0, 100);

  // Отложенные события (заглушка)
  S.scheduled = S.scheduled.filter(ev => {
    if (ev.in_days <= 0) {
      log(`Отложенное событие: ${ev.id}`, "amber");
      return false;
    }
    ev.in_days -= 1;
    return true;
  });

  log(`— День ${S.day} —`, "amber");

  showDayOverlay(S.day);
  busy = true;
  setTimeout(() => {
    busy = false;
    checkEnding();
    render();
  }, 1500);
}

function showDayOverlay(day) {
  const el = document.createElement("div");
  el.className = "day-overlay";
  el.innerHTML = `
    <div class="num">ДЕНЬ ${String(day).padStart(2, "0")}</div>
    <div class="line"></div>
    <div class="label">ПРОБУЖДЕНИЕ</div>
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

function checkEnding() {
  for (const e of ENDINGS) {
    if (e.check(S)) {
      S.ended = true;
      S.endingId = e.id;
      return;
    }
  }
}

function render() {
  if (S.ended) { renderEnding(); return; }
  renderHUD();
  renderStage();
  renderLog();
}

function renderHUD() {
  const hud = document.getElementById("hud");
  const cyberColor = S.cyber < 26 ? "var(--green)"
    : S.cyber < 51 ? "#ffcc00"
    : S.cyber < 76 ? "var(--amber)"
    : "var(--danger)";
  const healthClass = S.stats.health < 30 ? "d hud-warn" : "g";
  const hungerClass = S.stats.hunger > 70 ? "d hud-warn" : "";
  hud.innerHTML = `
    <div class="hud-row"><span class="hud-label">День</span><span class="hud-val">${S.day} · ${PHASE_NAMES[S.phase]}</span></div>
    <div class="hud-row"><span class="hud-label">Кредиты</span><span class="hud-val">₡${S.credits}</span></div>
    <div class="hud-row"><span class="hud-label">Здоровье</span><span class="hud-val ${healthClass}">${S.stats.health}</span></div>
    <div class="hud-row"><span class="hud-label">Стресс</span><span class="hud-val ${S.stats.stress > 70 ? 'd' : ''}">${S.stats.stress}</span></div>
    <div class="hud-row"><span class="hud-label">Ясность</span><span class="hud-val c">${S.stats.clarity}</span></div>
    <div class="hud-row"><span class="hud-label">Голод</span><span class="hud-val ${hungerClass}">${S.stats.hunger}</span></div>
    <div class="hud-cyber-bar"><div class="hud-cyber-fill" style="width:${S.cyber}%;background:${cyberColor}"></div></div>
    <div class="hud-cyber-text"><span>КИБЕРПСИХОЗ</span><span style="color:${cyberColor}">${S.cyber}%</span></div>
  `;
}

function renderStage() {
  const stage = document.getElementById("stage");

  // Проверка смерти от голода/здоровья
  if (S.stats.health <= 0 || S.stats.hunger >= 100) {
    S.ended = true;
    S.endingId = "death_end";
    renderEnding();
    return;
  }

  // СЮЖЕТ ИМЕЕТ ПРИОРИТЕТ
  let card = pickStoryCard();
  if (!card) card = pickFreeCard();

  if (!card) {
    stage.className = "stage-scene-apartment";
    stage.innerHTML = `
      <div class="scene-banner">
        <span class="loc">▣ ПУСТОТА</span>
        <span class="phase-tag">${PHASE_ICONS[S.phase]} ${PHASE_NAMES[S.phase]}</span>
      </div>
      <div class="card-title">Ничего не происходит</div>
      <div class="card-desc">Ты просто существуешь. Ждёшь.</div>
      <div class="options"><button class="opt" onclick="advancePhase()">Ждать</button></div>
    `;
    return;
  }

  S.pendingCard = card;

  const sceneKey = getSceneForCard(card, S);
  const scene = ART.locations[sceneKey] || ART.locations.apartment;
  stage.className = "stage-scene-" + sceneKey;

  const bannerClass = card.story ? "scene-banner story" : "scene-banner";
  const banner = `
    <div class="${bannerClass}">
      <span class="loc">${scene.icon} ${scene.label}</span>
      <span class="phase-tag">${PHASE_ICONS[S.phase]} ${PHASE_NAMES[S.phase]}</span>
    </div>
  `;

  let visual = "";
  const portrait = getPortraitForCard(card);
  const cutsceneSvg = (typeof ART.cutscenes !== "undefined") ? ART.cutscenes[card.id] : null;
  if (portrait) {
    visual = `<div class="portrait-frame">${portrait}</div>`;
  } else if (cutsceneSvg) {
    visual = `<div class="cutscene-frame">${cutsceneSvg}</div>`;
  }

  if (card.desc === "cutscene") {
    renderCutscene(card, banner, visual);
  } else if (card.desc === "bureaucracy") {
    renderBureaucracy(card, banner, visual);
  } else {
    renderNormalCard(card, banner, visual);
  }
}

function renderNormalCard(card, banner, visual) {
  const stage = document.getElementById("stage");
  const opts = card.opts.map((o, i) =>
    `<button class="opt" onclick="chooseOption(${i})">${o.t}</button>`
  ).join("");
  const catClass = card.story ? "card-cat story" : "card-cat";
  const catLabel = card.story ? "★ " + (card.cat || "СЮЖЕТ") : (card.cat || "СОБЫТИЕ");
  stage.innerHTML = `
    ${banner}
    ${visual}
    <div class="${catClass}"><span>${catLabel}</span><span>${card.id}</span></div>
    <div class="card-title">${card.title}</div>
    <div class="card-desc">${card.desc}</div>
    <div class="options">${opts}</div>
  `;
}

function renderCutscene(card, banner, visual) {
  const stage = document.getElementById("stage");
  const opts = card.opts.map((o, i) =>
    `<button class="opt" onclick="chooseOption(${i})">${o.t}</button>`
  ).join("");
  stage.innerHTML = `
    ${banner}
    ${visual}
    <div class="card-cat"><span>МГНОВЕНИЕ</span></div>
    <div class="card-title">${card.title}</div>
    <div class="cutscene">${card.cut}</div>
    <div class="options">${opts}</div>
  `;
}

function renderBureaucracy(card, banner, visual) {
  const stage = document.getElementById("stage");
  const fields = card.doc.fields.map(f => `
    <div class="doc-field ${f.err ? 'err' : ''}">
      <span>${f.k}</span><span>${f.v}</span>
    </div>
  `).join("");
  const opts = card.opts.map((o, i) =>
    `<button class="opt" onclick="chooseOption(${i})">${o.t}</button>`
  ).join("");
  stage.innerHTML = `
    ${banner}
    ${visual}
    <div class="card-cat"><span>БЮРОКРАТИЧЕСКИЙ СТОЛ</span></div>
    <div class="card-title">${card.title}</div>
    <div class="doc">
      <div style="color:var(--dim);font-size:11px;margin-bottom:6px">${card.doc.title}</div>
      ${fields}
    </div>
    <div class="options">${opts}</div>
  `;
}

function chooseOption(i) {
  if (busy) return;
  const card = S.pendingCard;
  if (!card) return;
  const opt = card.opts[i];
  if (!opt) return;
  log(`▸ ${opt.t}`, "amber");
  applyEffects(opt.e);
  if (S.cyber >= 100) { S.ended = true; S.endingId = "cyber_end"; }
  advancePhase();
}

function renderLog() {
  const logEl = document.getElementById("log");
  logEl.innerHTML = S.log.slice(0, 12).map(l =>
    `<div class="log-line ${l.cls}"><span class="t">[Д${l.day}]</span> ${l.msg}</div>`
  ).join("");
}

function renderEnding() {
  const stage = document.getElementById("stage");
  const hud = document.getElementById("hud");
  hud.innerHTML = "";
  stage.className = "stage-scene-apartment";
  const e = ENDINGS.find(x => x.id === S.endingId) || ENDINGS[0];
  stage.innerHTML = `
    <div class="ending-title">${e.title}</div>
    <div class="ending-tag">${e.tag}</div>
    <div class="ending-desc">${e.desc}</div>
    <div class="card-cat" style="margin-top:20px">ИТОГ ЖИЗНИ</div>
    <div class="doc">
      <div class="doc-field"><span>Дней прожито</span><span>${S.day}</span></div>
      <div class="doc-field"><span>Кредитов</span><span>₡${S.credits}</span></div>
      <div class="doc-field"><span>Киберпсихоз</span><span>${S.cyber}%</span></div>
      <div class="doc-field"><span>Эфир</span><span>${S.factions.ether}</span></div>
      <div class="doc-field"><span>Коготь</span><span>${S.factions.claw}</span></div>
      <div class="doc-field"><span>Поток</span><span>${S.factions.stream}</span></div>
      <div class="doc-field"><span>Сай</span><span>${S.rel.v}</span></div>
      <div class="doc-field"><span>Кестрел</span><span>${S.rel.kestrel}</span></div>
      <div class="doc-field"><span>Мира</span><span>${S.rel.mira}</span></div>
    </div>
    <div class="options" style="margin-top:20px">
      <button class="opt" onclick="restart()">Прожить другую жизнь</button>
    </div>
  `;
}

function restart() {
  localStorage.removeItem(SAVE_KEY);
  S = newState();
  busy = false;
  log("Новая жизнь. День 1.", "green");
  render();
}

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(S));
    log("Сохранено.", "green");
    renderLog();
  } catch (e) { log("Ошибка: " + e.message, "danger"); }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    S = JSON.parse(raw);
    return true;
  } catch (e) { return false; }
}

function openMenu() {
  const m = document.getElementById("modal");
  m.classList.remove("hidden");
  m.innerHTML = `
    <div class="modal-box">
      <h2>СИСТЕМА</h2>
      <div class="options">
        <button class="opt" onclick="saveGame();closeMenu()">Сохранить</button>
        <button class="opt" onclick="if(confirm('Начать заново?')){restart();closeMenu()}">Новая жизнь</button>
        <button class="opt" onclick="closeMenu()">Закрыть</button>
      </div>
      <p style="margin-top:14px;font-size:11px;color:var(--dim)">CYBERCELL v0.3 · сюжет 7 дней</p>
    </div>
  `;
}
function closeMenu() {
  document.getElementById("modal").classList.add("hidden");
}

function boot() {
  if (!loadGame()) {
    S = newState();
    log("Пробуждение. День 1.", "green");
    log("Капсула 7-Б. Сектор 12.", "");
  }
  checkEnding();
  render();
}

window.addEventListener("load", boot);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) saveGame();
});

window.advancePhase = advancePhase;
window.chooseOption = chooseOption;
window.restart = restart;
window.saveGame = saveGame;
window.openMenu = openMenu;
window.closeMenu = closeMenu;
