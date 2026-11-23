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
