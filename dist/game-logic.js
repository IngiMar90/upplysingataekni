'use strict';
const GameTools = (() => {
  const clone = value => JSON.parse(JSON.stringify(value));
  const same = (a, b) => Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => a[key] === b[key]);
  class DrawingHistory {
    constructor(initial) { this.state = clone(initial); this.past = []; this.future = []; }
    apply(next) { if (same(next, this.state)) return false; this.past.push(clone(this.state)); this.state = clone(next); this.future = []; return true; }
    undo() { if (!this.past.length) return false; this.future.push(clone(this.state)); this.state = this.past.pop(); return true; }
    redo() { if (!this.future.length) return false; this.past.push(clone(this.state)); this.state = this.future.pop(); return true; }
  }
  function clampPicture(piece) {
    const size = Math.max(65, Math.min(220, piece.size));
    return { ...piece, size, x: Math.max(0, Math.min(1000 - size, piece.x)), y: Math.max(0, Math.min(430 - size, piece.y)) };
  }
  function fits(piece, goal, level) {
    const positionTolerance = [50, 32, 22][level - 1];
    const sizeTolerance = [0, 22, 15][level - 1];
    return piece.key === goal.key && Math.abs(piece.size - goal.size) <= sizeTolerance && Math.abs(piece.x - goal.x) <= positionTolerance && Math.abs(piece.y - goal.y) <= positionTolerance;
  }
  function editorTask(level, round) {
    const keys = ['ball', 'duck', 'kite', 'blocks', 'car', 'teddy', 'apple', 'train'];
    const key = keys[round % keys.length];
    if (level === 1) return { pieces: [{ key, x: 100, y: 135, size: 160 }], goals: [{ key, x: 690, y: 135, size: 160 }] };
    if (level === 2) { const size = round % 2 ? 160 : 130; return { pieces: [{ key, x: 120, y: 110, size: round % 2 ? 90 : 190 }], goals: [{ key, x: 690, y: 145, size }] }; }
    const used = [key, keys[(round + 2) % keys.length], keys[(round + 4) % keys.length]];
    return {
      pieces: used.map((key, i) => ({ key, x: [70, 270, 75][i], y: [30, 130, 260][i], size: [135, 90, 130][i] })),
      goals: used.map((key, i) => ({ key, x: [570, 780, 570][i], y: [40, 220, 270][i], size: [110, 150, 100][i] }))
    };
  }
  return Object.freeze({ DrawingHistory, same, clampPicture, fits, editorTask });
})();
if (typeof module !== 'undefined' && module.exports) module.exports = GameTools;
