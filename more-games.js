'use strict';

function doors() {
  const level = settings.level;
  const folders = [
    { id: 'images', name: t("Myndir"), example: 'photo' }, { id: 'toys', name: t("Leikföng"), example: 'ball' },
    { id: 'text', name: t("Textar"), example: 'document' }, { id: 'food', name: t("Matur"), example: 'apple' },
    { id: 'sound', name: t("Hljóð"), example: 'music' }, { id: 'tools', name: t("Verkfæri"), example: 'hammer' }
  ];
  const easyKeys = ['ball', 'duck', 'car', 'apple', 'teddy', 'train', 'kite', 'blocks'];
  const targetKey = easyKeys[round % easyKeys.length];
  const folder = level === 3 ? folders.filter(f => ['images', 'text', 'sound'].includes(f.id))[round % 3] : folders[round % folders.length];
  const pool = Object.keys(objects).filter(k => objects[k][1] === folder.id);
  const extension = { images: '.png', text: '.txt', sound: '.mp3' }[folder.id] || '.png';
  const files = Array.from({ length: 6 }, (_, i) => ({ id: 'file-' + i, key: pool[i % pool.length], name: objects[pool[i % pool.length]][0] + '-' + (i + 1) + extension }));
  const targetFile = files[round % files.length];
  let stage = 'folders', solved = false;
  const detail = level === 1 ? t("Smelltu einu sinni á dyrnar með réttu myndinni.") : t("Tvísmelltu til að opna. Þú mátt líka velja tákn og ýta á Enter.");
  instruction(level === 1 ? t("Opnaðu dyrnar með réttu myndinni.") : level === 2 ? t("Opnaðu möppuna: ") + folder.name + '.' : t("Opnaðu: ") + folder.name + ' / ' + targetFile.name, detail);
  $('#surface').innerHTML = `<div class="open-game"><aside class="open-target">${img(level === 1 ? targetKey : level === 2 ? 'folder-' + folder.id : targetFile.key)}<div><small>${level === 1 ? t("Finndu þessa mynd") : level === 2 ? t("Finndu þessa möppu") : t("Finndu þessa skrá")}</small><strong>${level === 1 ? objects[targetKey][0] : level === 2 ? folder.name : targetFile.name}</strong>${level === 3 ? ("<span>" + t("Í möppunni ")) + folder.name + "</span>" : ''}</div></aside><section class="open-desktop"><div class="open-path" id="open-path"></div><div class="open-grid" id="open-grid"></div><p class="open-tip">${detail}</p></section></div>`;
  function win(button) {
    if (solved) return; solved = true; button.classList.add('opened');
    $('#open-grid').querySelectorAll('button').forEach(b => { b.disabled = true; });
    chime(); feedback(level === 1 ? t("Réttar dyr! Vel gert.") : t("Þú opnaðir rétt. Vel gert!"), 'success'); autoAdvance();
  }
  function draw() {
    const grid = $('#open-grid');
    $('#open-path').innerHTML = level === 1 ? ("<span>" + t("Veldu réttu dyrnar") + "</span>") : stage === 'files' ? ("<button class=\"quiet\" id=\"open-back\">" + t("Til baka") + "</button><span>" + t("Tölvan / ")) + folder.name + "</span>" : ("<span>" + t("Tölvan") + "</span>");
    if ($('#open-back')) $('#open-back').onclick = () => { if (!solved) { stage = 'folders'; feedback(''); draw(); } };
    let choices;
    if (level === 1) choices = shuffle([targetKey, ...shuffle(easyKeys.filter(k => k !== targetKey)).slice(0, 2)]).map(key => ({ id: key, key, name: objects[key][0], right: key === targetKey }));
    else if (stage === 'files') choices = shuffle(files).map(file => ({ ...file, right: file.id === targetFile.id }));
    else choices = shuffle(level === 2 ? folders : folders.filter(f => f.id !== 'food')).map(f => ({ id: f.id, key: 'folder-' + f.id, name: f.name, right: f.id === folder.id }));
    grid.className = 'open-grid ' + (level === 1 ? 'door-grid' : 'folder-grid');
    grid.innerHTML = choices.map(choice => `<button class="open-choice ${level === 1 ? 'door-choice' : ''}" data-open="${choice.id}" aria-label="${level === 1 ? t("Dyr: ") : stage === 'files' ? t("Skrá: ") : t("Mappa: ")}${choice.name}">${level === 1 ? "<span class=\"door-art\">" + img('door-closed') + img(choice.key, 'door-window') + "</span>" : img(choice.key)}<strong>${choice.name}</strong></button>`).join('');
    choices.forEach(choice => {
      const button = $(`[data-open="${choice.id}"]`);
      const open = () => {
        if (solved) return;
        if (!choice.right) { feedback(t("Þetta er annað tákn. Skoðaðu fyrirmyndina og prófaðu aftur."), 'retry'); return; }
        if (level === 3 && stage === 'folders') { stage = 'files'; feedback(t("Rétt mappa. Finndu nú skrána ") + targetFile.name + '.', 'success'); draw(); $('#open-back').focus({ preventScroll: true }); }
        else win(button);
      };
      button.onclick = () => {
        if (solved) return;
        if (level === 1) { open(); return; }
        grid.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        button.classList.add('selected'); feedback(t("Tákn valið. Tvísmelltu eða ýttu á Enter til að opna."));
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
  instruction(level === 1 ? t("Færðu myndina í rammann.") : level === 2 ? t("Láttu myndina passa í rammann.") : t("Láttu allar myndirnar passa í rammana."), level === 1 ? t("Haltu músarhnappnum niðri og dragðu myndina.") : t("Veldu mynd. Færðu hana og dragðu í hornið til að breyta stærð."));
  $('#surface').innerHTML = `<div class="editor-toolbar"><span id="editor-selected">${level === 1 ? t("Dragðu myndina") : t("Veldu mynd til að byrja")}</span>${level > 1 ? ("<div><button class=\"quiet\" id=\"picture-smaller\" disabled>− " + t("Minna") + "</button><button class=\"quiet\" id=\"picture-bigger\" disabled>+ " + t("Stærra") + "</button></div>") : ''}<span class="editor-count" id="editor-count">0 / ${pieces.length}</span></div><div class="editor-scroll"><div class="editor-canvas" id="editor-canvas" aria-label="${t("Myndasvæði")}">${task.goals.map((goal, i) => `<div class="picture-goal" data-goal="${i}" aria-label="${t("Rammi fyrir ")}${objects[goal.key][0]}">${img(goal.key)}<span class="goal-check" aria-hidden="true">✓</span></div>`).join('')}${pieces.map((piece, i) => `<div class="picture-piece" data-piece="${i}"><button class="picture-face" data-face="${i}" aria-label="${t("Velja og færa: ")}${objects[piece.key][0]}" aria-pressed="false">${img(piece.key)}</button>${level > 1 ? "<button class=\"resize-handle\" data-resize=\"" + i + '" aria-label="' + t('Breyta stærð: ') + objects[piece.key][0] + ("\" title=\"" + t("Dragðu hornið til að breyta stærð") + "\"></button>") : ''}</div>`).join('')}</div></div><p class="editor-hint">${level === 1 ? t("Einnig má velja myndina og nota örvatakkana.") : t("Dragðu hornið eða notaðu Minna / Stærra. Örvatakkar færa valda mynd.")}</p>`;
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
    $('#editor-selected').textContent = selected === null ? t("Veldu mynd til að byrja") : t("Valin mynd: ") + objects[pieces[selected].key][0];
    $('#editor-count').textContent = pieces.filter(p => p.done).length + ' / ' + pieces.length;
    if (level > 1) { $('#picture-smaller').disabled = selected === null || solved || pieces[selected].done; $('#picture-bigger').disabled = selected === null || solved || pieces[selected].done; }
  }
  function choose(i) { if (solved || pieces[i].done) return false; selected = i; draw(); return true; }
  function settle(i) {
    if (solved || pieces[i].done) return;
    if (!GameTools.fits(pieces[i], task.goals[i], level)) return;
    pieces[i] = { ...task.goals[i], done: true }; chime();
    if (pieces.every(p => p.done)) { solved = true; feedback(t("Myndirnar passa! Vel gert."), 'success'); }
    else { feedback(t("Myndin passar. Prófaðu næstu mynd."), 'success'); selected = pieces.findIndex(p => !p.done); }
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
  const lesson = new GameTools.UndoLesson(level);
  const actionLabels = { move: t('Færðu myndina á annan stað.'), resize: t('Dragðu hornið til að breyta stærð.') };
  const actionLabel = (kind, index) => kind === 'move' && index === 2 ? t('Færðu myndina aftur á annan stað.') : actionLabels[kind];
  const actionDetails = {
    move: t('Haltu músarhnappnum niðri á myndinni, dragðu hana og slepptu. Örvatakkar geta líka fært myndina.'),
    resize: t('Haltu litla horninu niðri og dragðu til að stækka eða minnka myndina. Örvatakkar á horninu virka líka.')
  };
  const undoHint = t('Haltu Ctrl niðri og ýttu á Z til að afturkalla. Slepptu síðan báðum tökkunum.');
  const snapshots = [{ ...lesson.initial }];
  lesson.actions.forEach((kind, index) => {
    const state = { ...snapshots.at(-1) };
    if (kind === 'move') { state.x = index === 2 ? 38 : 72; state.y = index === 2 ? 65 : 38; }
    else if (kind === 'resize') state.size = 78;
    snapshots.push(state);
  });
  const frames = [{ state: snapshots[0], kind: 'intro' }, ...lesson.actions.map((kind, i) => ({ state: snapshots[i + 1], kind }))];
  for (let i = snapshots.length - 2; i >= 0; i--) frames.push({ state: snapshots[i], kind: 'undo' });
  let demonstration = round === 0, frame = 0, selected = true, solved = false, gesture = null, draft = null;
  const pointerArt = '<svg viewBox="0 0 32 40" aria-hidden="true"><path d="M4 2v29l8-7 6 13 7-3-6-12h11Z" fill="#fff" stroke="#493c8a" stroke-width="3" stroke-linejoin="round"/></svg>';
  $('#surface').innerHTML = `<div class="undo-lesson">
    <div class="undo-lesson-head"><strong id="undo-mode"></strong><span id="undo-demo-count"></span><button class="quiet" id="undo-demo">${t('Sýna mér aftur')}</button></div>
    <ol class="undo-plan">${lesson.actions.map((kind, i) => `<li data-undo-step="${i}"><span aria-hidden="true">${i + 1}</span>${actionLabel(kind, i)}</li>`).join('')}<li data-undo-step="${lesson.actions.length}"><span aria-hidden="true">↶</span>Ctrl + Z · ${t('Afturkalla')}</li></ol>
    <div class="undo-support">
    <div class="undo-guidance" id="undo-guidance" role="status"></div>
    <div class="undo-keyboard" id="undo-keyboard" aria-keyshortcuts="Control+Z"><div><kbd id="undo-ctrl">Ctrl</kbd><b>+</b><kbd id="undo-z">Z</kbd><strong>↶ ${t('Afturkalla')}</strong></div><p>${undoHint}</p><small id="undo-count"></small></div>
    <div class="undo-demo-controls" id="undo-demo-controls"><button class="secondary" id="undo-demo-next"></button><button class="primary" id="undo-try">${t('Ég prófa')}</button></div>
    </div>
    <div class="undo-board"><section><h3>${t('Svona á myndin að vera')}</h3><div class="undo-stage reference-stage">${img(key)}</div></section><section><h3>${t('Vinnusvæðið þitt')}</h3><div class="undo-stage undo-editable" id="undo-stage" aria-label="${t('Vinnusvæði myndar')}">
      <div class="undo-origin" id="undo-origin" aria-hidden="true"></div><div class="undo-missing" id="undo-missing" hidden>${t('Myndinni var eytt. Ctrl + Z færir hana til baka.')}</div>
      <div class="undo-object" id="undo-object"><button class="undo-face" id="undo-face" aria-label="${t('Velja og færa: ')}${objects[key][0]}" aria-pressed="true">${img(key)}</button><button class="undo-resize" id="undo-resize" aria-label="${t('Breyta stærð: ')}${objects[key][0]}"></button></div><div class="undo-demo-pointer" id="undo-demo-pointer" aria-hidden="true">${pointerArt}</div>
    </div></section></div>
  </div>`;
  const stage = $('#undo-stage'), image = $('#undo-object'), face = $('#undo-face'), handle = $('#undo-resize');
  function drawPicture() {
    const state = demonstration ? frames[frame].state : draft || lesson.state;
    image.hidden = !state.visible; $('#undo-missing').hidden = state.visible;
    image.style.left = state.x + '%'; image.style.top = state.y + '%'; image.style.width = state.size + 'px'; image.style.height = state.size + 'px';
    image.classList.toggle('selected', selected && !demonstration && !solved && !lesson.readyToUndo);
    image.classList.toggle('gesturing', Boolean(gesture));
    face.disabled = demonstration || solved || lesson.readyToUndo;
    face.setAttribute('aria-pressed', String(selected));
    handle.hidden = demonstration || !selected || solved || lesson.nextAction !== 'resize';
    $('#undo-origin').hidden = !settings.help || demonstration;
    const cursor = $('#undo-demo-pointer'); cursor.hidden = !demonstration || !['intro', 'move', 'resize'].includes(frames[frame].kind);
    cursor.style.left = state.x + '%'; cursor.style.top = state.y + '%';
    cursor.classList.toggle('at-corner', demonstration && frames[frame].kind === 'resize');
  }
  function draw() {
    drawPicture();
    $('#undo-mode').textContent = demonstration ? t('Sýnikennsla – horfðu fyrst') : t('Nú er komið að þér');
    $('#undo-demo-count').textContent = demonstration ? `${frame + 1} / ${frames.length}` : '';
    $('#undo-demo').hidden = demonstration; $('#undo-demo-controls').hidden = !demonstration;
    $('#undo-demo-next').textContent = frame === frames.length - 1 ? t('Sýna aftur') : t('Næsta sýniskref');
    const undoFrame = demonstration && frames[frame].kind === 'undo';
    $('#undo-keyboard').classList.toggle('active', undoFrame || (!demonstration && lesson.readyToUndo));
    $('#undo-ctrl').classList.toggle('pressed', undoFrame); $('#undo-z').classList.toggle('pressed', undoFrame);
    const done = demonstration ? Math.min(frame, lesson.actions.length) : lesson.history.past.length;
    document.querySelectorAll('[data-undo-step]').forEach((node, i) => {
      node.classList.toggle('finished', i < done);
      node.classList.toggle('active', i === (demonstration ? frames[frame].kind === 'undo' ? lesson.actions.length : Math.max(0, frame - 1) : lesson.readyToUndo ? lesson.actions.length : done));
    });
    let title, detail;
    if (demonstration) {
      const kind = frames[frame].kind;
      title = t('Sýnikennsla: breyttu og afturkallaðu með Ctrl + Z.');
      detail = kind === 'intro' ? t('Fyrst er myndin óbreytt. Horfðu á breytingarnar, eina í einu.') : kind === 'undo' ? frame === frames.length - 1 ? t('Ctrl + Z hefur fært myndina aftur eins og hún var. Nú mátt þú prófa.') : t('Ctrl + Z afturkallar síðustu breytinguna. Ýttu aftur til að fara eitt skref lengra til baka.') : actionDetails[kind];
      $('#undo-guidance').textContent = kind === 'intro' ? t('Veldu Næsta sýniskref til að sjá hvað gerist.') : kind === 'undo' ? t('Ctrl + Z · Afturkalla síðustu breytingu') : actionLabel(kind, frame - 1);
    } else {
      title = lesson.readyToUndo ? t('Ýttu á Ctrl + Z til að laga myndina.') : actionLabel(lesson.nextAction, lesson.history.past.length);
      detail = lesson.readyToUndo ? undoHint : actionDetails[lesson.nextAction] + ' ' + t('Síðan notarðu Ctrl + Z til að afturkalla.');
      $('#undo-guidance').textContent = solved ? t('Þú lagaðir myndina með Ctrl + Z. Vel gert!') : lesson.readyToUndo ? t('Breytingarnar eru þínar. Færðu þær til baka með Ctrl + Z.') : t('Gerðu breytinguna sjálf/ur á myndinni.');
    }
    instruction(title, detail);
    $('#undo-count').textContent = demonstration ? '' : lesson.history.past.length ? I18n.count('changes', lesson.history.past.length) : t('Myndin er óbreytt.');
  }
  $('#undo-demo-next').onclick = () => { frame = (frame + 1) % frames.length; draw(); };
  $('#undo-try').onclick = () => { demonstration = false; selected = true; draw(); face.focus({preventScroll:true}); };
  $('#undo-demo').onclick = () => { gesture = null; draft = null; demonstration = true; frame = 0; feedback(''); draw(); $('#undo-demo-next').focus({preventScroll:true}); };
  function commit(kind, next) {
    draft = null;
    if (lesson.change(kind, next)) { draw(); feedback(lesson.readyToUndo ? t('Nú skaltu ýta á Ctrl + Z.') : t('Breyting skráð. Prófaðu næsta skref.'), 'success'); }
    else { draw(); feedback(t('Dragðu aðeins lengra til að breyta myndinni. Prófaðu aftur.')); }
  }
  function begin(e, kind) {
    if (e.button !== 0 || demonstration || solved || lesson.nextAction !== kind) return;
    e.preventDefault(); e.stopPropagation(); selected = true;
    e.currentTarget.focus({preventScroll:true});
    gesture = {kind, pointerId:e.pointerId, x:e.clientX, y:e.clientY, before:{...lesson.state}};
    e.currentTarget.setPointerCapture(e.pointerId); drawPicture();
  }
  function move(e) {
    if (!gesture || e.pointerId !== gesture.pointerId) return;
    const bounds = stage.getBoundingClientRect(), dx = e.clientX - gesture.x, dy = e.clientY - gesture.y;
    draft = GameTools.clampUndoPicture(gesture.kind === 'move' ? {...gesture.before, x:gesture.before.x + dx * 100 / bounds.width, y:gesture.before.y + dy * 100 / bounds.height} : {...gesture.before, size:gesture.before.size + (dx + dy) / 2}, bounds.width, bounds.height);
    drawPicture();
  }
  function end(e) {
    if (!gesture || e.pointerId !== gesture.pointerId) return;
    const kind = gesture.kind, next = draft || gesture.before; gesture = null;
    if (GameTools.same(next, lesson.state)) { draft = null; drawPicture(); return; }
    commit(kind, next);
  }
  function cancel() { gesture = null; draft = null; drawPicture(); }
  listen(face, 'pointerdown', e => begin(e, 'move')); listen(handle, 'pointerdown', e => begin(e, 'resize'));
  [face,handle].forEach(node => { listen(node, 'pointermove', move); listen(node, 'pointerup', end); listen(node, 'pointercancel', cancel); });
  face.onclick = () => { if (!demonstration && !solved) { selected = true; drawPicture(); } };
  listen(stage, 'pointerdown', e => { if (e.target === stage) { selected = false; drawPicture(); } });
  const arrows = ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];
  [face,handle].forEach((node, index) => { node.onkeydown = e => {
    const kind = index ? 'resize' : 'move';
    if (!arrows.includes(e.key) || demonstration || solved || lesson.nextAction !== kind || e.repeat) return;
    e.preventDefault(); const bounds = stage.getBoundingClientRect(), sign = ['ArrowLeft','ArrowUp'].includes(e.key) ? -1 : 1;
    const next = GameTools.clampUndoPicture(index ? {...lesson.state,size:lesson.state.size + sign * 18} : {...lesson.state, x:lesson.state.x + (['ArrowLeft','ArrowRight'].includes(e.key) ? sign * 4 : 0), y:lesson.state.y + (['ArrowUp','ArrowDown'].includes(e.key) ? sign * 4 : 0)}, bounds.width,bounds.height);
    commit(kind, next);
  }; });
  function goBack() {
    if (solved) return;
    if (demonstration) { if (frames[frame + 1]?.kind === 'undo') { frame++; draw(); } return; }
    gesture = null; draft = null;
    if (!lesson.undo()) { drawPicture(); feedback(t('Breyttu myndinni fyrst. Síðan geturðu notað Ctrl + Z.')); return; }
    if (lesson.complete) { solved = true; chime(); draw(); feedback(t('Þú lagaðir myndina með Ctrl + Z. Vel gert!'), 'success'); autoAdvance(); }
    else { draw(); feedback(lesson.readyToUndo ? t('Ein breyting fór til baka. Ýttu aftur á Ctrl + Z.') : t('Breytingin fór til baka. Prófaðu breytingarnar aftur.'), 'success'); }
  }
  listen(document, 'keydown', e => {
    if ($('dialog[open]') || ['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName) || e.target.isContentEditable) return;
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') { e.preventDefault(); if (!e.repeat) goBack(); $('#undo-ctrl').classList.add('pressed'); $('#undo-z').classList.add('pressed'); return; }
    if (e.key === 'Control') $('#undo-ctrl').classList.add('pressed');

  });
  const releaseKeys = () => { $('#undo-ctrl')?.classList.remove('pressed'); $('#undo-z')?.classList.remove('pressed'); };
  listen(document,'keyup',releaseKeys); listen(window,'blur',releaseKeys);
  cleanups.push(() => { gesture = null; draft = null; });
  draw();
}
