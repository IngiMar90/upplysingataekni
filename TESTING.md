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

## Update: six games

- Browser: all six illustrated home cards inspected.
- Doors: full six-task level 1 session with automatic progression; level 3 single-click selection, double-click opening of folder, then double-click opening of the correct file and automatic progression.
- Picture editor: actual pointer drag completed level 1; actual corner-handle resize plus pointer drag completed level 2; all three level 3 pictures resized and moved into their frames with automatic progression.
- Undo: full six-task level 1 session; level 3 three-step undo, Ctrl+Z, redo, and progression verified.
- `node test-game-logic.cjs`: history snapshot isolation, undo/redo ordering, branching after a new edit, no-op edits, reachability of all editor goals across every round, size and identity matching, and canvas bounds.
- `node verify.mjs`: all 53 offline resources, including new game scripts and illustrations.

## Installed-app identity repair

- Separate root-relative identities, start URLs and scopes for `/upplysingataekni/` and `/ondun/`; neither resolves to the shared origin root.
- Games cache reads restricted to the current games cache; requests outside the games folder are not intercepted.
- Tests preserve unrelated breathing-cache entries during games cache cleanup.
- Cross-app manifest and breathing-worker checks verify distinct identities and that breathing does not intercept game requests.

## Icelandic, English and Polish

- `node test-i18n.cjs`: 239 UI translation keys in all three languages, language-specific word banks for every level, correction targets, valid/invalid saved language, blocked storage, Polish plural forms.
- `node verify.mjs`: 54 offline assets including the full translation script; distinct app identity and isolation from the breathing app remain verified. Existing game-logic tests and syntax checks pass.
- Browser: all three language selectors, localized home cards and Polish teacher settings inspected. English level 3 instructions and object/folder/file labels rendered in all six games.
- Browser: Polish level 3 typing advanced automatically from task 1 to task 2. The on-screen ł button inserted the correct character at the text cursor; completing the word advanced to task 3. Switching to English retained task 3 and level 3 and changed its typing target.
- Browser: reload retained English and the selected level. A complete six-task English level 1 typing session advanced without Enter. The completion screen switched to Polish, and progress remained exactly one completed round after returning home.
- Polish speech availability accurately reported that no matching voice was installed in the test browser. Actual audible speech requires a corresponding system voice on the student's device.
- Pages deployment for commit b9c649b8146270b9b3536e31939809f1b13c0ea5 succeeded; published site verified in Chrome. Closing all old game windows allowed the offline update to activate.

## Guided Ctrl + Z lessons and direct editing

- Unit tests cover pristine starts at all three levels; edits are never pre-applied. One completed gesture creates one history entry, small jitter and wrong action types do not count, early undo cannot skip required edits, and all required undo steps restore the exact original state. Responsive bounds keep moved and resized pictures inside the canvas.
- Existing picture-editor and DrawingHistory tests pass. Translation coverage now includes 254 UI keys across Icelandic, English and Polish. Offline tests verify that all 54 resources are installed with cache reload requests and that cache/app identity boundaries are preserved.
- Browser: level 1 demonstration shows a move and its reversal with highlighted Ctrl + Z keys while task progress remains 1 of 6. Actual pointer dragging followed by actual Ctrl + Z restores the picture and automatically advances to task 2.
- Browser: level 2 arrow-key movement and actual corner-handle pointer resizing produce exactly two undo entries. Reopening the demonstration preserves the first edit. The first Ctrl + Z restores size while retaining the moved position; the second restores the original position and automatically advances.
- Browser: level 3 Polish demonstration moves, resizes, deletes and then restores the picture in three reverse steps without changing task progress. In practice, direct movement and resizing followed by the actual Delete key create three changes. Three actual Ctrl + Z keypresses restore visibility, size and position in order, then advance to task 2.
- English, Polish and Icelandic demonstration text, keyboard guidance and feedback inspected. Icelandic desktop layout visually inspected with instructions, sample picture, workspace and keyboard guidance visible together. Native touch input and school-managed Chromebook keyboard behavior remain device-level checks.
- GitHub Pages deployment d263e976189c6e85e6acd14da4ae785798b6473b succeeded. Browser tab left on the Icelandic level 1 demonstration.
