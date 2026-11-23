# Validation of the first release

- JavaScript syntax checked with `node --check dist/app.js` and `node --check dist/sw.js`.
- `node verify.mjs`: manifest/icon paths, complete offline cache resource list, cached navigation without network, cache cleanup isolation and client activation.
- Original SVG assets parsed as XML; 192 and 512 pixel app icons generated from the original vector.
- Chrome browser: landing page and illustrations visually inspected. Pakkasmiðjan: actual pointer drag, click-to-select alternative, wrong bin feedback, correct bins and next task. Level 3 file sorting inspected.
- Chrome browser: full six-task treasure session, actual scrolling down and back up, retained scroll position, completion screen.
- Chrome browser: full six-task level 1 typing session including accented Icelandic letters, incorrect answer recovery, and full level 2 session including Backspace correction and Enter submission.
- Teacher settings, level changes and persisted completed-session count observed in browser.

Installation on school-managed Windows/Chromebook devices, touch input, native Icelandic voices and screen reader behavior must still be checked on the intended devices. Browser checks are not a guarantee of a school's installation policy. The game does not lock other applications or prevent Esc; full kiosk restrictions are device administration.

Static hosting uses only local assets. No external analytics, accounts or API calls are required by the app. Optional speech uses the browser's system voices.

## Update: clearer toys, automatic advancement and larger levels

- Visually inspected a rendered sheet of the updated soccer ball, blocks, kite, teddy, toy car, train, bath duck and puzzle.
- Browser verified nine-file sorting automatically moves from task 1 to task 2 of 10, with no next button.
- Full six-task level 1 typing session automatically completed without Enter or next clicks.
- Full ten-task level 3 typing session automatically completed, including capital letters, punctuation, spaces and final Backspace correction.
- Confirmed six sorting objects on level 2 and nine on level 3; treasure counts are 24 on level 2 and 40 on level 3. Treasure automatically advances while retaining scroll position.
- Re-ran offline-cache and manifest verification with all new assets included.
