'use strict';

function doors() {
  const level = settings.level;
  const folders = [
    { id: 'images', name: 'Myndir', example: 'photo' }, { id: 'toys', name: 'Leikföng', example: 'ball' },
    { id: 'text', name: 'Textar', example: 'document' }, { id: 'food', name: 'Matur', example: 'apple' },
    { id: 'sound', name: 'Hljóð', example: 'music' }, { id: 'tools', name: 'Verkfæri', example: 'hammer' }
  ];
  const easyKeys = ['ball', 'duck', 'car', 'apple', 'teddy', 'train', 'kite', 'blocks'];
  const targetKey = easyKeys[round % easyKeys.length];
  const folder = level === 3 ? folders.filter(f => ['images', 'text', 'sound'].includes(f.id))[round % 3] : folders[round % folders.length];
  const pool = Object.keys(objects).filter(k => objects[k][1] === folder.id);
  const extension = { images: '.png', text: '.txt', sound: '.mp3' }[folder.id] || '.png';
  const files = Array.from({ length: 6 }, (_, i) => ({ id: 'file-' + i, key: pool[i % pool.length], name: objects[pool[i % pool.length]][0] + '-' + (i + 1) + extension }));
  const targetFile = files[round % files.length];
  let stage = 'folders', solved = false;
  const detail = level === 1 ? 'Smelltu einu sinni á dyrnar með réttu myndinni.' : 'Tvísmelltu til að opna. Þú mátt líka velja tákn og ýta á Enter.';
  instruction(level === 1 ? 'Opnaðu dyrnar með réttu myndinni.' : level === 2 ? 'Opnaðu möppuna: ' + folder.name + '.' : 'Opnaðu: ' + folder.name + ' / ' + targetFile.name, detail);
  $('#surface').innerHTML = `<div class="open-game"><aside class="open-target">${img(level === 1 ? targetKey : level === 2 ? 'folder-' + folder.id : targetFile.key)}<div><small>${level === 1 ? 'Finndu þessa mynd' : level === 2 ? 'Finndu þessa möppu' : 'Finndu þessa skrá'}</small><strong>${level === 1 ? objects[targetKey][0] : level === 2 ? folder.name : targetFile.name}</strong>${level === 3 ? '<span>Í möppunni ' + folder.name + '</span>' : ''}</div></aside><section class="open-desktop"><div class="open-path" id="open-path"></div><div class="open-grid" id="open-grid"></div><p class="open-tip">${detail}</p></section></div>`;
  function win(button) {
    if (solved) return; solved = true; button.classList.add('opened');
    $('#open-grid').querySelectorAll('button').forEach(b => { b.disabled = true; });
    chime(); feedback(level === 1 ? 'Réttar dyr! Vel gert.' : 'Þú opnaðir rétt. Vel gert!', 'success'); autoAdvance();
  }
  function draw() {
    const grid = $('#open-grid');
    $('#open-path').innerHTML = level === 1 ? '<span>Veldu réttu dyrnar</span>' : stage === 'files' ? '<button class="quiet" id="open-back">Til baka</button><span>Tölvan / ' + folder.name + '</span>' : '<span>Tölvan</span>';
    if ($('#open-back')) $('#open-back').onclick = () => { if (!solved) { stage = 'folders'; feedback(''); draw(); } };
    let choices;
    if (level === 1) choices = shuffle([targetKey, ...shuffle(easyKeys.filter(k => k !== targetKey)).slice(0, 2)]).map(key => ({ id: key, key, name: objects[key][0], right: key === targetKey }));
    else if (stage === 'files') choices = shuffle(files).map(file => ({ ...file, right: file.id === targetFile.id }));
    else choices = shuffle(level === 2 ? folders : folders.filter(f => f.id !== 'food')).map(f => ({ id: f.id, key: 'folder-' + f.id, name: f.name, right: f.id === folder.id }));
    grid.className = 'open-grid ' + (level === 1 ? 'door-grid' : 'folder-grid');
    grid.innerHTML = choices.map(choice => `<button class="open-choice ${level === 1 ? 'door-choice' : ''}" data-open="${choice.id}" aria-label="${level === 1 ? 'Dyr: ' : stage === 'files' ? 'Skrá: ' : 'Mappa: '}${choice.name}">${level === 1 ? '<span class="door-art">' + img('door-closed') + img(choice.key, 'door-window') + '</span>' : img(choice.key)}<strong>${choice.name}</strong></button>`).join('');
    choices.forEach(choice => {
      const button = $(`[data-open="${choice.id}"]`);
      const open = () => {
        if (solved) return;
        if (!choice.right) { feedback('Þetta er annað tákn. Skoðaðu fyrirmyndina og prófaðu aftur.', 'retry'); return; }
        if (level === 3 && stage === 'folders') { stage = 'files'; feedback('Rétt mappa. Finndu nú skrána ' + targetFile.name + '.', 'success'); draw(); $('#open-back').focus({ preventScroll: true }); }
        else win(button);
      };
      button.onclick = () => {
        if (solved) return;
        if (level === 1) { open(); return; }
        grid.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        button.classList.add('selected'); feedback('Tákn valið. Tvísmelltu eða ýttu á Enter til að opna.');
      };
      if (level > 1) button.ondblclick = open;
      button.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); open(); } };
    });
  }
  draw();
}

function picture() {
  const level = settings.level, task = GameTools.editorTask(level, round);
  const pieces = task.pieces.map(p => ({ ...p, done: false }));
  let selected = level === 1 ? 0 : null, gesture = null, solved = false;
  instruction(level === 1 ? 'Færðu myndina í rammann.' : level === 2 ? 'Láttu myndina passa í rammann.' : 'Láttu allar myndirnar passa í rammana.', level === 1 ? 'Haltu músarhnappnum niðri og dragðu myndina.' : 'Veldu mynd. Færðu hana og dragðu í hornið til að breyta stærð.');
  $('#surface').innerHTML = `<div class="editor-toolbar"><span id="editor-selected">${level === 1 ? 'Dragðu myndina' : 'Veldu mynd til að byrja'}</span>${level > 1 ? '<div><button class="quiet" id="picture-smaller" disabled>− Minna</button><button class="quiet" id="picture-bigger" disabled>+ Stærra</button></div>' : ''}<span class="editor-count" id="editor-count">0 / ${pieces.length}</span></div><div class="editor-scroll"><div class="editor-canvas" id="editor-canvas" aria-label="Myndasvæði">${task.goals.map((goal, i) => `<div class="picture-goal" data-goal="${i}" aria-label="Rammi fyrir ${objects[goal.key][0]}">${img(goal.key)}<span class="goal-check" aria-hidden="true">✓</span></div>`).join('')}${pieces.map((piece, i) => `<div class="picture-piece" data-piece="${i}"><button class="picture-face" data-face="${i}" aria-label="Velja og færa: ${objects[piece.key][0]}" aria-pressed="false">${img(piece.key)}</button>${level > 1 ? '<button class="resize-handle" data-resize="' + i + '" aria-label="Breyta stærð: ' + objects[piece.key][0] + '" title="Dragðu hornið til að breyta stærð"></button>' : ''}</div>`).join('')}</div></div><p class="editor-hint">${level === 1 ? 'Einnig má velja myndina og nota örvatakkana.' : 'Dragðu hornið eða notaðu Minna / Stærra. Örvatakkar færa valda mynd.'}</p>`;
  const canvas = $('#editor-canvas');
  const position = (el, item) => { el.style.left = item.x / 10 + '%'; el.style.top = item.y / 4.3 + '%'; el.style.width = item.size / 10 + '%'; el.style.height = item.size / 4.3 + '%'; };
  task.goals.forEach((goal, i) => position($(`[data-goal="${i}"]`), goal));
  function draw() {
    pieces.forEach((piece, i) => {
      const el = $(`[data-piece="${i}"]`); position(el, piece); el.classList.toggle('selected', selected === i && !piece.done); el.classList.toggle('fitted', piece.done); el.style.zIndex = selected === i ? 4 : piece.done ? 1 : 2;
      $(`[data-face="${i}"]`).setAttribute('aria-pressed', String(selected === i));
      $(`[data-face="${i}"]`).disabled = piece.done;
      if ($(`[data-resize="${i}"]`)) $(`[data-resize="${i}"]`).disabled = piece.done;
      $(`[data-goal="${i}"]`).classList.toggle('matched', piece.done);
      $(`[data-goal="${i}"]`).classList.toggle('active', settings.help && selected === i && !piece.done);
    });
    $('#editor-selected').textContent = selected === null ? 'Veldu mynd til að byrja' : 'Valin mynd: ' + objects[pieces[selected].key][0];
    $('#editor-count').textContent = pieces.filter(p => p.done).length + ' / ' + pieces.length;
    if (level > 1) { $('#picture-smaller').disabled = selected === null || solved || pieces[selected].done; $('#picture-bigger').disabled = selected === null || solved || pieces[selected].done; }
  }
  function choose(i) { if (solved || pieces[i].done) return false; selected = i; draw(); return true; }
  function settle(i) {
    if (solved || pieces[i].done) return;
    if (!GameTools.fits(pieces[i], task.goals[i], level)) return;
    pieces[i] = { ...task.goals[i], done: true }; chime();
    if (pieces.every(p => p.done)) { solved = true; feedback('Myndirnar passa! Vel gert.', 'success'); }
    else { feedback('Myndin passar. Prófaðu næstu mynd.', 'success'); selected = pieces.findIndex(p => !p.done); }
    draw(); if (solved) autoAdvance();
  }
  function begin(e, i, mode) {
    if (e.button !== 0 || !choose(i)) return;
    e.preventDefault(); e.stopPropagation();
    e.currentTarget.focus({ preventScroll: true });
    gesture = { i, mode, pointerId: e.pointerId, clientX: e.clientX, clientY: e.clientY, original: { ...pieces[i] }, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e) {
    if (!gesture || e.pointerId !== gesture.pointerId) return;
    const bounds = canvas.getBoundingClientRect(), dx = (e.clientX - gesture.clientX) * 1000 / bounds.width, dy = (e.clientY - gesture.clientY) * 430 / bounds.height;
    if (Math.hypot(dx, dy) > 4) gesture.moved = true;
    const original = gesture.original;
    pieces[gesture.i] = GameTools.clampPicture(gesture.mode === 'move' ? { ...original, x: original.x + dx, y: original.y + dy } : { ...original, size: original.size + (dx + dy) / 2 }); draw();
  }
  function end(e) { if (!gesture || e.pointerId !== gesture.pointerId) return; const { i, moved } = gesture; gesture = null; if (moved) settle(i); }
  function cancel() { if (gesture) { pieces[gesture.i] = gesture.original; gesture = null; draw(); } }
  pieces.forEach((piece, i) => {
    const face = $(`[data-face="${i}"]`), handle = $(`[data-resize="${i}"]`);
    face.onclick = () => choose(i);
    listen(face, 'pointerdown', e => begin(e, i, 'move'));
    [face, handle].filter(Boolean).forEach(node => { listen(node, 'pointermove', move); listen(node, 'pointerup', end); listen(node, 'pointercancel', cancel); });
    if (handle) { listen(handle, 'pointerdown', e => begin(e, i, 'resize')); handle.onkeydown = e => { if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) || !choose(i)) return; e.preventDefault(); pieces[i] = GameTools.clampPicture({ ...pieces[i], size: pieces[i].size + (['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 1) * (e.shiftKey ? 15 : 5) }); draw(); settle(i); }; }
    face.onkeydown = e => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) || !choose(i)) return;
      e.preventDefault(); const amount = e.shiftKey ? 25 : 10;
      pieces[i] = GameTools.clampPicture({ ...pieces[i], x: pieces[i].x + (e.key === 'ArrowRight' ? amount : e.key === 'ArrowLeft' ? -amount : 0), y: pieces[i].y + (e.key === 'ArrowDown' ? amount : e.key === 'ArrowUp' ? -amount : 0) }); draw(); settle(i);
    };
  });
  if (level > 1) [-10, 10].forEach((change, i) => { $(i ? '#picture-bigger' : '#picture-smaller').onclick = () => { if (selected === null || solved || pieces[selected].done) return; const index = selected; pieces[index] = GameTools.clampPicture({ ...pieces[index], size: pieces[index].size + change }); draw(); settle(index); }; });
  cleanups.push(() => { gesture = null; }); draw();
}

function undo() {
  const level = settings.level, key = ['ball', 'duck', 'car', 'teddy', 'kite', 'blocks', 'train', 'apple'][round % 8];
  const initial = { x: 50, y: 50, size: 150, visible: true };
  const history = new GameTools.DrawingHistory(initial);
  const actionNames = { hide: 'Fela mynd', move: 'Færa mynd', shrink: 'Minnka mynd' };
  const firstAction = ['hide', 'move', 'shrink'][round % 3];
  let started = level > 1, solved = false;
  const transform = (kind, state) => kind === 'hide' ? { ...state, visible: false } : kind === 'move' ? { ...state, x: state.x === 50 ? 72 : 50, y: state.y === 50 ? 30 : 50 } : { ...state, size: state.size === 150 ? 85 : 150 };
  if (level === 2) ['move', round % 2 ? 'hide' : 'shrink'].forEach(kind => history.apply(transform(kind, history.state)));
  if (level === 3) ['move', 'shrink', 'hide'].forEach(kind => history.apply(transform(kind, history.state)));
  instruction(level === 1 ? 'Prófaðu: ' + actionNames[firstAction] + '.' : 'Lagaðu myndina með Afturkalla.', level === 1 ? 'Síðan færðu myndina til baka með Afturkalla.' : 'Afturkalla færir eina breytingu til baka í einu. Þú mátt líka nota Ctrl + Z.');
  $('#surface').innerHTML = `<div class="undo-workshop"><div class="undo-board"><section><h3>Svona á myndin að vera</h3><div class="undo-stage reference-stage">${img(key)}</div></section><section><h3>Svona er myndin núna</h3><div class="undo-stage" id="undo-stage"><span class="undo-missing" id="undo-missing" hidden>Myndin er falin</span><div class="undo-object" id="undo-object">${img(key)}</div></div></section></div><div class="undo-toolbar"><div class="undo-history"><button class="primary" id="do-undo" disabled>↶ Afturkalla</button>${level > 1 ? '<button class="secondary" id="do-redo" disabled>↷ Endurgera</button>' : ''}</div><span class="undo-count" id="undo-count"></span><div class="undo-experiments">${(level === 1 ? [firstAction] : ['move', 'shrink', 'hide']).map(kind => `<button class="quiet" data-change="${kind}">${actionNames[kind]}</button>`).join('')}</div></div><p class="editor-hint">${level === 1 ? 'Það er í lagi að prófa. Afturkalla hjálpar þér að laga.' : '<kbd>Ctrl</kbd> + <kbd>Z</kbd> afturkallar. <kbd>Ctrl</kbd> + <kbd>Y</kbd> endurgerir.'}</p></div>`;
  function draw() {
    const state = history.state, image = $('#undo-object'); image.hidden = !state.visible; image.style.left = state.x + '%'; image.style.top = state.y + '%'; image.style.width = state.size + 'px'; image.style.height = state.size + 'px'; $('#undo-missing').hidden = state.visible;
    $('#do-undo').disabled = solved || !history.past.length; if ($('#do-redo')) $('#do-redo').disabled = solved || !history.future.length;
    document.querySelectorAll('[data-change]').forEach(b => { b.disabled = solved || (level === 1 && started); });
    $('#undo-count').textContent = history.past.length ? history.past.length + (history.past.length === 1 ? ' breyting til baka' : ' breytingar til baka') : started ? 'Myndin er í réttu horfi' : 'Prófaðu breytinguna';
    if (settings.help) $('#do-undo').classList.toggle('suggested', !solved && history.past.length > 0);
  }
  function check() {
    if (!started || solved || !GameTools.same(history.state, initial)) return;
    solved = true; chime(); feedback('Þú lagaðir myndina. Vel gert!', 'success'); draw(); autoAdvance();
  }
  document.querySelectorAll('[data-change]').forEach(button => { button.onclick = () => {
    if (solved) return;
    if (history.apply(transform(button.dataset.change, history.state))) { started = true; instruction('Lagaðu myndina með Afturkalla.', 'Afturkalla færir síðustu breytingu til baka.'); feedback('Myndin breyttist. Nú geturðu afturkallað.'); draw(); }
  }; });
  function goBack() { if (solved || !history.undo()) return; draw(); check(); if (!solved) feedback('Ein breyting fór til baka. Haltu áfram.', 'success'); }
  function goForward() { if (solved || !history.redo()) return; draw(); feedback('Breytingin var endurgerð. Þú getur afturkallað hana aftur.'); }
  $('#do-undo').onclick = goBack; if ($('#do-redo')) $('#do-redo').onclick = goForward;
  listen(document, 'keydown', e => {
    if ($('dialog[open]') || (!e.ctrlKey && !e.metaKey) || ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
    if (e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey && level > 1) goForward(); else goBack(); }
    if (e.key.toLowerCase() === 'y' && level > 1) { e.preventDefault(); goForward(); }
  });
  draw();
}
