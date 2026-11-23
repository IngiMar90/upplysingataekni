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
