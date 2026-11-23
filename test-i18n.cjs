const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('dist/i18n.js','utf8');
function load(saved, blocked = false) {
  const writes = [];
  const context = {module:{exports:{}}, localStorage:{getItem:()=>{if(blocked) throw Error('blocked');return saved;},setItem:(...args)=>{if(blocked)throw Error('blocked');writes.push(args);}}};
  vm.runInNewContext(source,context);
  return {i18n:context.module.exports,writes};
}
const expected = {is:['Pakkasmiðjan','Skrifaðu stafinn.','sól'], en:['Packing workshop','Type the letter.','sun'], pl:['Pakowanie','Wpisz literę.','kot']};
const keys = new Set();
for (const file of ['dist/app.js','dist/more-games.js']) {
  const code = fs.readFileSync(file,'utf8');
  for (const match of code.matchAll(/\bt\((['"])([^'"\n]+)\1\)/g)) keys.add(match[2]);
}
const html=fs.readFileSync('dist/index.html','utf8');
const body=html.slice(html.indexOf('<body>'));
const nativeNames=new Set(['Íslenska','English','Polski','⚙','×','⛶']);
for (const match of body.matchAll(/>([^<>]+)</g)) { const text=match[1].trim(); if(text&&!nativeNames.has(text))keys.add(text); }
for (const match of body.matchAll(/(?:aria-label|title)="([^"]+)"/g)) keys.add(match[1]);
for (const language of ['is','en','pl']) {
  const {i18n,writes}=load(language);
  assert.equal(i18n.language,language);
  assert.equal(i18n.t('Pakkasmiðjan'),expected[language][0]);
  assert.equal(i18n.t('Skrifaðu stafinn.'),expected[language][1]);
  for (const key of keys) {
    assert(i18n.has(key),`Missing source key: ${key}`);
    assert(i18n.t(key).trim(),`Empty ${language}: ${key}`);
    if (language!=='is') assert.notEqual(i18n.t(key),key,`Untranslated ${language}: ${key}`);
  }
  for(const level of [1,2,3]) {
    const tasks=i18n.typingTasks(level);
    assert.equal(tasks.length,[6,8,10][level-1]);
    for (const task of tasks) { assert(task.word.length>0&&task.word.length<80); assert.equal(task.word,task.word.normalize('NFC')); }
    if (level>1) assert.equal(tasks.at(-1).seed.slice(0,-1),tasks.at(-1).word,'Backspace recovers the exact target');
  }
  assert.equal(i18n.typingTasks(2)[0].word,expected[language][2]);
  assert.equal(i18n.setLanguage('unknown'),false); assert.equal(i18n.language,language);
  i18n.setLanguage('pl'); assert.deepEqual(writes.at(-1),['tolvuleikir-language','pl']);
}
const polish=load('pl').i18n;
for(const [n,word] of [[1,'plik'],[2,'pliki'],[5,'plików'],[12,'plików'],[22,'pliki']]) assert.equal(polish.count('files',n),n+' '+word);
for (const saved of [null,'fr','"en"','__proto__']) assert.equal(load(saved).i18n.language,'is');
const blocked=load('pl',true).i18n; assert.equal(blocked.language,'is');assert(blocked.setLanguage('pl'));assert.equal(blocked.t('Bolti'),'Piłka');
console.log(`Verified ${keys.size} UI keys in all three languages, local word banks, correction tasks, stored language and unavailable storage.`);
