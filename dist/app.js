'use strict';
const t = I18n.t;
const $ = (s, root = document) => root.querySelector(s);
const app = $('#app');
const defaults = { level: 1, help: true, sound: true, speech: false };
function readStore(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } }
let settings = { ...defaults, ...readStore('tolvuleikir-settings', {}) };
if (![1, 2, 3].includes(settings.level)) settings.level = 1;
let progress = readStore('tolvuleikir-progress', {});
function persist(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Playing remains possible without storage. */ } }
let completionVisible = false, installedApp = false;
let current = null, round = 0, cleanups = [], deferredInstall = null, audioContext, advanceTimer = null;
const sessionLength = () => [6, 8, 10][settings.level - 1];
function makeGames() { return {
  pack: { name: t("Pakkasmiðjan"), skill: t("Draga og sleppa"), description: t("Settu hlutina á réttan stað."), tint: '#eef6ee', icon: 'pack', learned: t("Þú æfðir að velja hluti og færa þá á réttan stað."), bridge: t("Prófaðu með kennara: dragðu mynd inn á glæru í PowerPoint.") },
  treasure: { name: t("Fjársjóðsleit"), skill: t("Skruna og finna"), description: t("Skrunaðu og finndu fjársjóðinn."), tint: '#fff3df', icon: 'treasure', learned: t("Þú æfðir að skruna upp og niður og finna ákveðinn hlut."), bridge: t("Prófaðu með kennara: finndu mynd neðar á venjulegri vefsíðu.") },
  robot: { name: t("Vélmennaritun"), skill: t("Smella og skrifa"), description: t("Hjálpaðu vélmenninu að skrifa."), tint: '#edf1ff', icon: 'robot', learned: t("Þú æfðir að smella í textareit og nota lyklaborðið."), bridge: t("Prófaðu með kennara: smelltu í textareit í Word og skrifaðu stutt orð.") },
  doors: { name: t("Opnaðu réttu dyrnar"), skill: t("Smella og opna"), description: t("Finndu réttu dyrnar og opnaðu."), tint: '#fff0e8', icon: 'doors', learned: t("Þú æfðir að velja og opna tákn, möppur og skrár."), bridge: t("Prófaðu með kennara: veldu möppu og opnaðu hana í skráasafni tölvunnar.") },
  picture: { name: t("Myndasmiðjan"), skill: t("Færa og breyta stærð"), description: t("Komdu myndunum í rétta ramma."), tint: '#eaf5fc', icon: 'picture', learned: t("Þú æfðir að velja mynd, færa hana og breyta stærð hennar."), bridge: t("Prófaðu með kennara: settu mynd á glæru og dragðu í horn hennar til að breyta stærðinni.") },
  undo: { name: t("Lagaðu mistökin"), skill: t("Afturkalla og laga"), description: t("Færðu myndina aftur í rétt horf."), tint: '#f1edfb', icon: 'undo', learned: t("Þú æfðir að breyta mynd sjálf/ur og nota Ctrl + Z til að afturkalla breytingarnar."), bridge: t("Prófaðu með kennara: færðu mynd í PowerPoint og ýttu á Ctrl + Z til að færa hana til baka.") }
}; }
let games = makeGames();
function makeObjects() { return {
  apple: [t("Epli"), 'food'], pear: [t("Pera"), 'food'], banana: [t("Banani"), 'food'], carrot: [t("Gulrót"), 'food'],
  ball: [t("Bolti"), 'toys'], kite: [t("Flugdreki"), 'toys'], blocks: [t("Kubbar"), 'toys'], teddy: [t("Bangsi"), 'toys'],
  car: [t("Leikfangabíll"), 'toys'], train: [t("Lest"), 'toys'], duck: [t("Baðönd"), 'toys'], puzzle: [t("Púsl"), 'toys'],
  hammer: [t("Hamar"), 'tools'], brush: [t("Pensill"), 'tools'], wrench: [t("Skiptilykill"), 'tools'], ruler: [t("Reglustika"), 'tools'],
  photo: [t("Mynd"), 'images'], landscape: [t("Landslag"), 'images'], portrait: [t("Andlit"), 'images'],
  document: [t("Texti"), 'text'], letter: [t("Bréf"), 'text'], notebook: [t("Glósubók"), 'text'],
  headphones: [t("Heyrnartól"), 'sound'], music: [t("Tónlist"), 'sound'], speaker: [t("Hátalari"), 'sound'], leaf: [t("Lauf"), 'nature'], star: [t("Stjarna"), 'nature'],
  cup: [t("Bolli"), 'home'], key: [t("Lykill"), 'home']
}; }
let objects = makeObjects();
const img = (name, cls = '', alt = '') => `<img src="assets/${name}.svg" class="${cls}" alt="${alt}" draggable="false">`;
function dispose() { clearTimeout(advanceTimer); advanceTimer = null; cleanups.forEach(fn => fn()); cleanups = []; if ('speechSynthesis' in window) speechSynthesis.cancel(); }
function listen(node, event, handler, options) { node.addEventListener(event, handler, options); cleanups.push(() => node.removeEventListener(event, handler, options)); }
function announce(message) { $('#announcement').textContent = ''; requestAnimationFrame(() => { $('#announcement').textContent = message; }); }
function feedback(message, kind = '') { const el = $('#feedback'); if (el) { el.className = 'feedback ' + kind; el.textContent = message; } announce(message); }
function selectedVoice() { return 'speechSynthesis' in window ? speechSynthesis.getVoices().find(v => v.lang.toLowerCase().split(/[-_]/)[0] === I18n.language) : null; }
function isVoice() { return Boolean(selectedVoice()); }
function speak(text) {
  if (!('speechSynthesis' in window)) { feedback(t("Rödd fannst ekki á völdu tungumáli. Fyrirmælin sjást á skjánum.")); return; }
  const voice = selectedVoice();
  if (!voice) { feedback(t("Rödd fannst ekki á völdu tungumáli. Fyrirmælin sjást á skjánum.")); return; }
  speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.voice = voice; utterance.lang = I18n.locale; utterance.rate = .82; speechSynthesis.speak(utterance);
}
function chime() {
  if (!settings.sound) return;
  try { audioContext ||= new (window.AudioContext || window.webkitAudioContext)(); audioContext.resume(); const t = audioContext.currentTime; [523.25, 659.25].forEach((f, i) => { const o = audioContext.createOscillator(), g = audioContext.createGain(); o.frequency.value = f; g.gain.setValueAtTime(0, t + i * .11); g.gain.linearRampToValueAtTime(.045, t + i * .11 + .02); g.gain.exponentialRampToValueAtTime(.001, t + i * .11 + .2); o.connect(g); g.connect(audioContext.destination); o.start(t + i * .11); o.stop(t + i * .11 + .22); }); } catch { /* Audio is optional. */ }
}
function home(focus = false) {
  dispose(); completionVisible = false; current = null; round = 0;
  document.body.classList.remove('playing');
  app.innerHTML = `<section class="hero"><p class="eyebrow">${t("Lærum með leik")}</p><h1>${t("Hvað viltu æfa í dag?")}</h1><p class="intro">${t("Veldu leik. Taktu þér góðan tíma.")}</p><span class="pill mode">${t("Stig ")}${settings.level} · ${[t("Fyrstu skref"), t("Meiri æfing"), t("Tölvufærni")][settings.level - 1]}</span></section><section class="cards" aria-label="${t("Veldu leik")}">${Object.entries(games).map(([id, g]) => `<button class="game-card" data-game="${id}" style="--tint:${g.tint}"><div class="card-art">${img(g.icon)}</div><h2>${g.name}</h2><p>${g.description}</p><div class="card-bottom"><span class="play-circle" aria-hidden="true">▶</span>${g.skill}</div></button>`).join('')}</section><footer class="home-note"><span><i class="note-dot" aria-hidden="true"></i>${t("Engin tímamörk. Alltaf hægt að prófa aftur.")}</span><span>${I18n.count("rounds", Object.values(progress).reduce((a, n) => a + (Number(n) || 0), 0))}</span></footer>`;
  document.querySelectorAll('[data-game]').forEach(b => b.onclick = () => start(b.dataset.game));
  if (focus) $('[data-game]').focus();
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function start(id) { completionVisible = false; dispose(); current = id; round = 0; renderGame(); window.scrollTo({ top: 0, behavior: 'instant' }); }
function shell() {
  const g = games[current];
  document.body.classList.add('playing');
  app.innerHTML = `<section class="game-top"><div class="game-identity">${img(g.icon)}<div><h1>${g.name}</h1><p>${t("Stig ")}${settings.level} · ${g.skill}</p></div></div><div class="game-actions"><button class="quiet" id="home">${t("Velja leik")}</button><div class="steps" role="img" aria-label="${t("Verkefni ")}${round + 1}${t(" af ")}${sessionLength()}">${Array.from({ length: sessionLength() }, (_, i) => `<span class="step ${i < round ? 'done' : i === round ? 'current' : ''}"></span>`).join('')}</div></div></section><section class="instruction"><div><h2 id="task-title" tabindex="-1"></h2><p id="task-detail"></p></div><button class="icon-button" id="read-task" aria-label="${t("Lesa fyrirmæli")}" title="${t("Lesa fyrirmæli")}">♬</button></section><section id="surface" class="game-surface" aria-label="${t("Leiksvæði")}"></section><div class="game-footer"><p id="feedback" class="feedback" role="status" aria-live="polite"></p><div class="bottom-actions" id="next-area"></div></div>`;
  $('#home').onclick = () => home(true);
  $('#read-task').onclick = () => speak($('#task-title').textContent + '. ' + $('#task-detail').textContent);
}
function instruction(title, detail) {
  $('#task-title').textContent = title; $('#task-detail').textContent = detail;
  if (settings.speech) speak(title + '. ' + detail);
}
function renderGame(keepTyping = false) {
  dispose(); shell(); ({ pack, treasure, robot, doors, picture, undo })[current]();
  if (keepTyping && current === 'robot') { const field = $('#type-input'); field.focus({ preventScroll: true }); field.setSelectionRange(field.value.length, field.value.length); }
  else $('#task-title').focus({ preventScroll: true });
}
function autoAdvance(callback) {
  clearTimeout(advanceTimer);
  $('#next-area').innerHTML = ("<span class=\"auto-note\">" + t("Held áfram sjálfkrafa…") + "</span>");
  const advance = () => {
    if ($('dialog[open]')) { advanceTimer = setTimeout(advance, 200); return; }
    advanceTimer = null;
    if (callback) callback();
    else { round++; if (round === sessionLength()) complete(); else renderGame(current === 'robot'); }
  };
  advanceTimer = setTimeout(advance, 1000);
}
function complete() {
  const id = current, g = games[id]; dispose(); document.body.classList.remove('playing'); progress[id] = (Number(progress[id]) || 0) + 1; persist('tolvuleikir-progress', progress);
  showCompletion();
}
function showCompletion() {
  completionVisible = true;
  const id = current, g = games[id];
  app.innerHTML = `<section class="completion">${img('medal')}<p class="eyebrow">${sessionLength()}${t(" verkefni búin")}</p><h1 tabindex="-1">${t("Vel gert!")}</h1><p>${t("Þú laukst umferð í leiknum „")}${g.name}${t("“.")}</p><div class="skill-card"><strong>${g.learned}</strong><p>${g.bridge}</p></div><div class="buttons"><button class="primary" id="again">${t("Spila aftur")}</button><button class="secondary" id="choose">${t("Velja annan leik")}</button></div></section>`;
  $('#again').onclick = () => start(id); $('#choose').onclick = () => home(true); $('h1', app).focus(); chime();
}
function shuffle(list) { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function pack() {
  const level = settings.level;
  const pairs = level === 1 ? [['food', 'toys']] : level === 2 ? [['food', 'toys', 'tools']] : [['images', 'text', 'sound']];
  const cats = pairs[round % pairs.length], names = { food: t("Matur"), toys: t("Leikföng"), tools: t("Verkfæri"), images: t("Myndir"), text: t("Textar"), sound: t("Hljóð") };
  const examples = { food: 'apple', toys: 'ball', tools: 'hammer', images: 'photo', text: 'document', sound: 'music' };
  let items = cats.flatMap(cat => shuffle(Object.keys(objects).filter(k => objects[k][1] === cat)).slice(0, level === 1 ? (cat === cats[0] ? 2 : 1) : level === 2 ? 2 : 3));
  items = shuffle(items);
  instruction(level === 3 ? t("Settu skrárnar í réttar möppur.") : t("Settu hlutina í rétta kassa."), t("Haltu músarhnappnum niðri, dragðu og slepptu. Eða smelltu á hlut og síðan á réttan stað."));
  $('#surface').innerHTML = `<div class="sort-workbench level-${level}" aria-label="${t("Hlutir til að flokka")}">${items.map(key => `<button class="item" data-item="${key}" aria-pressed="false" aria-label="${t("Velja ")}${objects[key][0]}">${img(key)}<span>${level === 3 ? ({ images: t("mynd"), text: t("texti"), sound: t("hljod") }[objects[key][1]]) + '-' + (items.indexOf(key) + 1) + ({ images: '.png', text: '.txt', sound: '.mp3' }[objects[key][1]]) : objects[key][0]}</span></button>`).join('')}</div><div class="bins bins-${cats.length}">${cats.map(cat => `<button class="bin" data-cat="${cat}" aria-label="${level === 3 ? t("Mappa") : t("Kassi")}: ${names[cat]}">${img(level === 3 ? 'folder-' + cat : examples[cat])}<strong>${names[cat]}</strong><small class="bin-count">${I18n.count(level === 3 ? "files" : "objects", 0)}</small></button>`).join('')}</div>`;
  const buttons = [...document.querySelectorAll('[data-item]')], bins = [...document.querySelectorAll('[data-cat]')];
  let selected = null, packed = new Set(), counts = {}, drag = null, suppressClick = false;
  function clearSelection() { selected = null; buttons.forEach(b => b.setAttribute('aria-pressed', 'false')); bins.forEach(b => b.classList.remove('hint', 'over')); }
  function select(b) { if (packed.has(b.dataset.item)) return; clearSelection(); selected = b; b.setAttribute('aria-pressed', 'true'); if (settings.help) bins.find(bin => bin.dataset.cat === objects[b.dataset.item][1]).classList.add('hint'); }
  function put(bin) {
    if (!selected) { feedback(t("Veldu fyrst hlut sem þú vilt færa.")); return; }
    const b = selected, key = b.dataset.item;
    if (objects[key][1] !== bin.dataset.cat) { feedback(t("Prófaðu annan stað. Þú getur þetta."), 'retry'); return; }
    packed.add(key); b.classList.add('packed'); b.disabled = true; b.setAttribute('aria-label', objects[key][0] + t(", komið á réttan stað"));
    const cat = bin.dataset.cat; counts[cat] = (counts[cat] || 0) + 1; $('.bin-count', bin).textContent = I18n.count(level === 3 ? "files" : "objects", counts[cat]);
    clearSelection(); chime();
    if (packed.size === items.length) { feedback(t("Allt komið á réttan stað. Vel gert!"), 'success'); autoAdvance(); }
    else { feedback(objects[key][0] + t(" er á réttum stað!"), 'success'); const next = buttons.find(el => !el.disabled); next?.focus({ preventScroll: true }); }
  }
  buttons.forEach(b => {
    b.onclick = () => { if (suppressClick) return; select(b); feedback(t("Veldu kassa fyrir ") + objects[b.dataset.item][0].toLowerCase() + '.'); };
    listen(b, 'pointerdown', e => { if (e.button !== 0 || b.disabled) return; select(b); drag = { b, x: e.clientX, y: e.clientY, moved: false }; b.setPointerCapture(e.pointerId); });
    listen(b, 'pointermove', e => { if (!drag || drag.b !== b) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.hypot(dx, dy) > 7) drag.moved = true; if (!drag.moved) return; b.classList.add('dragging'); b.style.transform = `translate(${dx}px,${dy}px)`; bins.forEach(bin => { const r = bin.getBoundingClientRect(); bin.classList.toggle('over', e.clientX >= r.left - 12 && e.clientX <= r.right + 12 && e.clientY >= r.top - 12 && e.clientY <= r.bottom + 12); }); });
    const cancelDrag = () => { b.classList.remove('dragging'); b.style.transform = ''; bins.forEach(bin => bin.classList.remove('over')); drag = null; };
    listen(b, 'pointerup', e => { if (!drag || drag.b !== b) return; const moved = drag.moved; const bin = bins.find(el => { const r = el.getBoundingClientRect(); return e.clientX >= r.left - 12 && e.clientX <= r.right + 12 && e.clientY >= r.top - 12 && e.clientY <= r.bottom + 12; }); cancelDrag(); if (moved) { suppressClick = true; setTimeout(() => { suppressClick = false; }, 0); if (bin) put(bin); else feedback(t("Slepptu hlutnum yfir kassa. Prófaðu aftur.")); } });
    listen(b, 'pointercancel', cancelDrag); cleanups.push(cancelDrag);
  });
  bins.forEach(b => b.onclick = () => put(b));
}

function treasure() {
  const rowCount = settings.level === 1 ? 4 : settings.level === 2 ? 6 : 8;
  const columns = settings.level === 1 ? 3 : settings.level === 2 ? 4 : 5;
  const all = shuffle(Object.keys(objects));
  const rows = Array.from({ length: rowCount }, (_, r) => Array.from({ length: columns }, (_, c) => ({ key: all[(r * columns + c) % all.length], id: `r${r}c${c}`, row: r, column: c })));
  const visits = {};
  const targets = Array.from({ length: sessionLength() }, (_, i) => { const row = i % 2 === 0 ? rowCount - 1 - (Math.floor(i / 2) % 2) : Math.floor(i / 2) % 2; const col = visits[row] || 0; visits[row] = col + 1; return rows[row][col]; });
  let target, locked = false;
  $('#surface').innerHTML = `<div class="scroll-layout"><aside class="target-panel" id="target-panel" aria-label="${t("Hluturinn sem á að finna")}"></aside><div><div class="scroll-window" id="scroll-window" tabindex="0" aria-label="${t("Skrunaðu hér til að leita")}"><div class="shelves level-${settings.level}">${rows.map((items, r) => `<div class="shelf" style="--columns:${columns}"><div class="shelf-label">${settings.level === 3 ? t("Skrár") : t("Hilla")} ${r + 1}</div>${items.map(o => `<button class="treasure-item" data-find="${o.id}" aria-label="${objects[o.key][0]}${settings.level === 3 ? ', ' + (r + 1) + '-' + (o.column + 1) : ''}">${img(o.key)}${settings.level === 1 ? '' : `<span>${objects[o.key][0]}${settings.level === 3 ? ' ' + (r + 1) + '-' + (o.column + 1) : ''}</span>`}</button>`).join('')}</div>`).join('')}</div></div><p class="scroll-tip" id="scroll-tip">${t("Skrunaðu með músarhjóli, tveimur fingrum á snertifleti eða skrunstikunni.")}</p></div></div>`;
  const win = $('#scroll-window');
  function setTarget() {
    locked = false; target = targets[round];
    instruction(t("Finndu: ") + objects[target.key][0] + (settings.level === 3 ? ' ' + (target.row + 1) + '-' + (target.column + 1) : '') + '.', t("Skrunaðu inni í glugganum. Smelltu á hlutinn þegar þú finnur hann."));
    $('#target-panel').innerHTML = `${img(target.key)}<div><p>${t("Finndu þetta")}</p><strong>${objects[target.key][0]}${settings.level === 3 ? ' ' + (target.row + 1) + '-' + (target.column + 1) : ''}</strong></div>`;
    $('#next-area').innerHTML = ''; feedback('');
    $('.steps').innerHTML = Array.from({ length: sessionLength() }, (_, i) => `<span class="step ${i < round ? 'done' : i === round ? 'current' : ''}"></span>`).join('');
    $('.steps').setAttribute('aria-label', `${t("Verkefni ")}${round + 1}${t(" af ")}${sessionLength()}`);
    updateHint();
  }
  function updateHint() {
    if (!settings.help || locked) { $('#scroll-tip').textContent = t("Skrunaðu með músarhjóli, snertifleti eða skrunstikunni."); return; }
    const el = $(`[data-find="${target.id}"]`), r = el.getBoundingClientRect(), viewport = win.getBoundingClientRect();
    $('#scroll-tip').textContent = r.bottom > viewport.bottom ? t("Skrunaðu niður til að leita.") : r.top < viewport.top ? t("Skrunaðu upp til að leita.") : t("Hluturinn er sýnilegur. Finndu hann og smelltu.");
  }
  listen(win, 'scroll', updateHint, { passive: true });
  document.querySelectorAll('[data-find]').forEach(b => b.onclick = () => {
    if (locked) return;
    if (b.dataset.find !== target.id) { feedback(t("Þetta er annar hlutur. Leitaðu að myndinni til hliðar."), 'retry'); return; }
    locked = true; b.classList.add('found'); b.disabled = true; chime(); feedback(t("Þú fannst réttan hlut. Vel gert!"), 'success');
    autoAdvance(() => { round++; if (round === sessionLength()) complete(); else { setTarget(); $('#task-title').focus({ preventScroll: true }); } });
  });
  setTarget();
}

function robot() {
  const level = settings.level;
  const tasks = I18n.typingTasks(level);
  const task = tasks[round];
  instruction(task.seed ? t("Lagaðu villuna.") : level === 1 ? t("Skrifaðu stafinn.") : t("Skrifaðu það sem þú sérð."), task.seed ? t("Notaðu Backspace til að eyða x. Síðan heldur leikurinn áfram.") : t("Smelltu í reitinn og skrifaðu. Leikurinn heldur sjálfkrafa áfram þegar svarið er rétt."));
  $('#surface').innerHTML = `<div class="robot-layout"><div class="robot-mascot">${img('robot')}<p id="robot-message">${t("Geturðu hjálpað mér?")}</p></div><form class="terminal" id="typing-form" novalidate><label for="type-input">${task.seed ? t("Svona á textinn að vera:") : t("Skrifaðu þetta:")}</label><div class="target-word" aria-label="${task.word}">${Array.from(task.word).map(c => `<span class="letter" aria-hidden="true">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</div><input class="type-input" id="type-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="keyboard-hint" aria-label="${t("Skrifaðu hér")}" placeholder="${t("Smelltu hér")}" maxlength="80"><p class="keyboard-hint" id="keyboard-hint">${settings.help ? (t("Notaðu ") + "<kbd>Backspace</kbd>" + t(" til að leiðrétta. ")) : ''}${t("Rétt svar fer sjálfkrafa í næsta verkefni.")}</p><button type="submit" class="sr-only" tabindex="-1">${t("Athuga svar")}</button></form></div>`;
  const input = $('#type-input'); let solved = false;
  if (task.seed) input.value = task.seed;
  function normalized(s) { return level === 3 ? s.normalize('NFC') : s.normalize('NFC').toLocaleLowerCase(I18n.language); }
  function showLetters() {
    const typed = Array.from(normalized(input.value)), expected = Array.from(normalized(task.word));
    document.querySelectorAll('.letter').forEach((el, i) => el.classList.toggle('correct', settings.help && typed[i] === expected[i])); input.classList.remove('invalid');
  }
  input.oninput = e => { showLetters(); if (!e.isComposing) checkAnswer(false); };
  input.oncompositionend = () => { showLetters(); checkAnswer(false); };
  if (task.seed) showLetters();
  function checkAnswer(showError) {
    if (solved) return;
    if (normalized(input.value) !== normalized(task.word)) { if (showError) { input.classList.add('invalid'); feedback(t("Skoðaðu fyrirmyndina. Þú mátt leiðrétta og prófa aftur."), 'retry'); } return; }
    solved = true; input.readOnly = true; $('#robot-message').textContent = t("Takk fyrir hjálpina!"); chime(); feedback(t("Rétt skrifað! Vel gert."), 'success'); autoAdvance();
  }
  $('#typing-form').onsubmit = e => { e.preventDefault(); checkAnswer(true); };
  const special = I18n.language === 'pl' ? [...new Set(Array.from(task.word).filter(c => /[ąćęłńóśźż]/i.test(c)))] : [];
  if (special.length) {
    const letters = document.createElement('div'); letters.className = 'special-letters';
    letters.innerHTML = `<span>${t('Sérstafir')}:</span>${special.map(c => `<button type="button" data-letter="${c}">${c}</button>`).join('')}<small>${t('Smelltu á staf ef hann er ekki á lyklaborðinu.')}</small>`;
    $('#typing-form').append(letters);
    letters.querySelectorAll('[data-letter]').forEach(button => button.onclick = () => {
      if (solved) return;
      const start = input.selectionStart, end = input.selectionEnd;
      input.value = input.value.slice(0, start) + button.dataset.letter + input.value.slice(end);
      input.focus({preventScroll:true}); input.setSelectionRange(start + 1, start + 1);
      showLetters(); checkAnswer(false);
    });
  }
}

$('#brand').onclick = () => home(true);
$('#fullscreen').onclick = async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch { announce(t("Skjáfylling er ekki tiltæk. Prófaðu F11 á tölvunni.")); $('#fullscreen').title = t("Prófaðu F11 til að fylla skjá"); } };
document.addEventListener('fullscreenchange', () => { $('#fullscreen').innerHTML = document.fullscreenElement ? ("⛶ <span>" + t("Minnka skjá") + "</span>") : ("⛶ <span>" + t("Fylla skjá") + "</span>"); });
$('#settings').onclick = () => {
  $(`[name="level"][value="${settings.level}"]`).checked = true;
  $('#help-setting').checked = settings.help; $('#sound-setting').checked = settings.sound; $('#speech-setting').checked = settings.speech;
  $('#voice-status').textContent = isVoice() ? t("Rödd er tiltæk á völdu tungumáli.") : t("Rödd fannst ekki á völdu tungumáli. Fyrirmælin sjást á skjánum.");
  $('#settings-status').textContent = ''; $('#settings-dialog').showModal();
};
$('#save-settings').onclick = () => {
  settings = { level: Number($('[name="level"]:checked').value), help: $('#help-setting').checked, sound: $('#sound-setting').checked, speech: $('#speech-setting').checked };
  persist('tolvuleikir-settings', settings); $('#settings-dialog').close();
  if (current) start(current); else home(true);
};
$('#reset-progress').onclick = () => { progress = {}; persist('tolvuleikir-progress', progress); $('#settings-status').textContent = t("Framvinda hefur verið núllstillt."); if (!current) home(); };
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; });
window.addEventListener('appinstalled', () => { installedApp = true; deferredInstall = null; $('#install-dialog').close(); $('#install').textContent = t("Uppsett"); });
$('#install').onclick = async () => {
  if (deferredInstall) { await deferredInstall.prompt(); await deferredInstall.userChoice; deferredInstall = null; return; }
  const installed = window.matchMedia('(display-mode: standalone)').matches || window.matchMedia('(display-mode: fullscreen)').matches;
  $('#install-content').innerHTML = installed ? ("<p>" + t("Leikurinn er þegar opinn sem app. Veldu „Fylla skjá“ ef þú vilt fela rammann í kringum hann.") + "</p>") : ("<p>" + t("Opnaðu leikinn í ") + "<b>" + t("Chrome eða Edge") + "</b>" + t(" á tölvu eða Chromebook.") + "</p><ol class=\"install-list\"><li>" + t("Veldu uppsetningartáknið við veffangastikuna, ef það birtist.") + "</li><li>" + t("Annars skaltu opna valmynd vafrans og leita að „Setja upp“ / „Install“ eða „Setja þessa síðu upp sem forrit“.") + "</li><li>" + t("Opnaðu síðan Tölvuleiki úr forritavalmynd tölvunnar.") + "</li></ol><p>" + t("Leikirnir eru tilbúnir til notkunar án nets þegar fyrstu opnun og niðurhali er lokið.") + "</p>");
  $('#install-dialog').showModal();
};
if ('serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').then(() => { navigator.serviceWorker.ready.then(() => announce(t("Leikirnir eru tilbúnir."))); }).catch(() => { /* Online games still work. */ }); });

const staticText = [], staticAttributes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
  const node = textWalker.currentNode, key = node.textContent.trim();
  if (I18n.has(key)) staticText.push({ node, key, before: node.textContent.match(/^\s*/)[0], after: node.textContent.match(/\s*$/)[0] });
}
document.querySelectorAll('[aria-label], [title]').forEach(node => {
  for (const attr of ['aria-label', 'title']) { const key = node.getAttribute(attr); if (I18n.has(key)) staticAttributes.push({ node, attr, key }); }
});
function updateLanguageUI() {
  document.documentElement.lang = I18n.language;
  document.title = t('Tölvuleikir · Lærum með leik');
  staticText.forEach(({node,key,before,after}) => { node.textContent = before + t(key) + after; });
  staticAttributes.forEach(({node,attr,key}) => node.setAttribute(attr,t(key)));
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === I18n.language)));
  $('#install').textContent = t(installedApp ? 'Uppsett' : 'Setja upp');
  $('#fullscreen').innerHTML = '⛶ <span>' + t(document.fullscreenElement ? 'Minnka skjá' : 'Fylla skjá') + '</span>';
}
document.querySelectorAll('[data-language]').forEach(button => {
  button.onclick = () => {
    if (button.dataset.language === I18n.language) return;
    dispose(); I18n.setLanguage(button.dataset.language);
    games = makeGames(); objects = makeObjects(); updateLanguageUI();
    if (completionVisible) showCompletion();
    else if (current) renderGame(); else home();
    button.focus({preventScroll:true});
    announce(t('Leikirnir eru tilbúnir.'));
  };
});
updateLanguageUI();
home();
