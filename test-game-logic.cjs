const assert = require('node:assert/strict');
const { DrawingHistory, same, clampPicture, fits, editorTask } = require('./dist/game-logic.js');

const original = { x: 50, y: 50, size: 150, visible: true };
const history = new DrawingHistory(original);
original.x = 99;
assert.equal(history.state.x, 50, 'History owns its snapshot');
const goal = { ...history.state };
history.apply({ ...history.state, x: 72 });
history.apply({ ...history.state, size: 85 });
history.apply({ ...history.state, visible: false });
assert.equal(history.past.length, 3);
history.undo(); assert.equal(history.state.visible, true); assert.equal(history.state.size, 85);
history.undo(); assert.equal(history.state.size, 150); assert.equal(history.state.x, 72);
history.redo(); assert.equal(history.state.size, 85);
history.undo(); history.undo(); assert(same(history.state, goal));
assert.equal(history.undo(), false, 'Undo does not cross the initial state');
history.redo(); history.apply({ ...history.state, visible: false });
assert.equal(history.redo(), false, 'A new edit discards the old redo branch');
assert.equal(history.apply({ ...history.state }), false, 'No-op edits do not add history');

for (const level of [1, 2, 3]) for (let round = 0; round < [6, 8, 10][level - 1]; round++) {
  const task = editorTask(level, round);
  assert.equal(task.pieces.length, level === 3 ? 3 : 1);
  assert.equal(new Set(task.pieces.map(p => p.key)).size, task.pieces.length);
  task.goals.forEach((target, i) => {
    assert.deepEqual(clampPicture(target), target, 'A target is reachable inside the canvas');
    assert(!fits(task.pieces[i], target, level), 'An exercise never starts solved');
    assert(fits({ ...target }, target, level));
    assert(!fits({ ...target, key: 'wrong-picture' }, target, level), 'A wrong picture cannot fit the frame');
    assert(!fits({ ...target, size: target.size + 40 }, target, level), 'Correct position with the wrong size is insufficient');
  });
}
const clamped = clampPicture({ key: 'ball', x: -40, y: 800, size: 1000 });
assert.deepEqual(clamped, { key: 'ball', x: 0, y: 210, size: 220 });
console.log('Verified undo/redo history, branch replacement, target reachability, object identity, size matching and canvas bounds.');

const { UndoLesson, clampUndoPicture } = require('./dist/game-logic.js');
for (const level of [1, 2, 3]) {
  const initial = {x:50,y:50,size:120,visible:true};
  const lesson = new UndoLesson(level,initial);
  initial.x = 99;
  assert.equal(lesson.state.x,50,'The pristine image is owned by the lesson');
  assert.equal(lesson.history.past.length,0,'No changes are made for the student');
  assert.equal(lesson.complete,false);
  assert.equal(lesson.undo(),false);
  assert.equal(lesson.change('delete',{...lesson.state,visible:false}),false,'Actions are guided in order');
  assert.equal(lesson.change('move',{...lesson.state,x:50.1}),false,'A click or jitter is not a completed move');
  assert.equal(lesson.change('move',{...lesson.state,x:72}),true);
  const moved = {...lesson.state};
  assert.equal(lesson.history.past.length,1,'One gesture is one undo step');
  if (level>1) {
    assert(lesson.undo()); assert.equal(lesson.complete,false,'Undoing early does not skip required learning steps');
    assert.equal(lesson.nextAction,'move'); assert(lesson.change('move',moved));
    assert.equal(lesson.change('resize',{...lesson.state,size:119}),false,'A tiny resize is not accepted');
    assert(lesson.change('resize',{...lesson.state,size:80}));
  }
  if (level===3) assert(lesson.change('delete',{...lesson.state,visible:false}));
  assert.equal(lesson.readyToUndo,true);
  assert.equal(lesson.change('move',{...lesson.state,x:40}),false,'Editing ends when the undo task begins');
  for(let i=level;i>0;i--) {
    assert(lesson.undo());
    assert.equal(lesson.history.past.length,i-1);
    assert.equal(lesson.complete,i===1,'Every user change must be undone');
    if(level===3 && i===3) assert.equal(lesson.state.visible,true,'Undo restores the deleted picture first');
    if(level>1 && i===2) assert.deepEqual(lesson.state,moved,'The next undo restores its previous size and position');
  }
  assert.deepEqual(lesson.state,{x:50,y:50,size:120,visible:true});
}
for(const width of [200,400,750]) for(const height of [180,220]) {
  const bounded = clampUndoPicture({x:800,y:-700,size:500,visible:true},width,height);
  assert(bounded.size<=Math.min(190,width-20,height-20));
  assert(bounded.x*width/100+bounded.size/2<=width);
  assert(bounded.y*height/100-bounded.size/2>=0);
}
console.log('Verified pristine starts, gesture-sized history, guided editing, early undo recovery, all-level restoration and responsive picture bounds.');
