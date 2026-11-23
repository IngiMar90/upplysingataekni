import {readFileSync, existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const manifest = JSON.parse(readFileSync('dist/manifest.webmanifest', 'utf8'));
assert.equal(manifest.scope, './');
assert.equal(manifest.start_url, './');
assert.equal(manifest.display, 'standalone');
for (const icon of manifest.icons) assert(existsSync('dist/' + icon.src), icon.src);
const workerSource = readFileSync('dist/sw.js', 'utf8');
const currentCache = workerSource.match(/const CACHE = '([^']+)'/)[1];
const handlers = {}, deleted = [], cached = [];
let claimed = false;
const context = {
  URL,
  self: { location: {origin: 'https://example.test'}, clients: {claim: async () => {claimed = true;}}, addEventListener: (type, handler) => {handlers[type] = handler;} },
  caches: {
    open: async () => ({addAll: async assets => {for (const asset of assets) {assert(existsSync('dist/' + (asset === './' ? 'index.html' : asset.slice(2))), asset);cached.push(asset);}}}),
    keys: async () => ['tolvuleikir-v0', currentCache, 'other-app'],
    delete: async key => {deleted.push(key);},
    match: async request => ({offline: true, request})
  },
  fetch: () => {throw new Error('Network must not be needed for cached pages');}
};
vm.runInNewContext(readFileSync('dist/sw.js', 'utf8'), context);
let done;
handlers.install({waitUntil: p => {done = p;}}); await done;
assert(cached.includes('./index.html')); assert(cached.includes('./app.js')); assert(cached.includes('./assets/robot.svg'));
handlers.activate({waitUntil: p => {done = p;}}); await done;
assert.deepEqual(deleted, ['tolvuleikir-v0']); assert(claimed);
let response;
handlers.fetch({request: {url: 'https://example.test/', method: 'GET', mode: 'navigate'}, respondWith: p => {response = p;}});
assert.equal((await response).offline, true);
assert.equal((await response).request, './index.html');
response = null;
handlers.fetch({request: {url: 'https://elsewhere.test/', method: 'GET'}, respondWith: p => {response = p;}});
assert.equal(response, null);
console.log(`Verified PWA manifest, ${cached.length} offline resources, offline navigation, cache isolation, and activation.`);
