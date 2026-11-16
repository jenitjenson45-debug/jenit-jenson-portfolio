const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  { name: 'Direct Connect Grid is flex row (same line)', pass: html.includes('display: flex') && html.includes('flex-direction: row') && html.includes('flex-wrap: nowrap') },
  { name: 'Skeuomorphic & Neumorphic card wraps share 50% width', pass: html.includes('.skeuo-card-wrap') && html.includes('.neu-card-wrap') && html.includes('flex: 1 1 0') },
  { name: 'Skeuomorphic Project Frame present (Royal Foods)', pass: html.includes('frame-skeuomorphic') && html.includes('frame-screw') && html.includes('SKEUOMORPHIC') },
  { name: 'Neumorphic Project Frame present (Zaffran)', pass: html.includes('frame-neumorphic') && html.includes('neu-frame-inner-well') && html.includes('NEUMORPHIC') },
  { name: 'Glassmorphic Project Frame present (Aegis Platform)', pass: html.includes('frame-glassmorphic') && html.includes('glass-frame-inner') && html.includes('GLASSMORPHIC') },
  { name: 'Tactical Skeuomorphic HUD Frame present (ResQLink)', pass: html.includes('frame-tactical') && html.includes('frame-bracket') && html.includes('SKEUOMORPHIC HUD') },
  { name: 'Defined frame boundary styles in CSS', pass: html.includes('.frame-skeuomorphic') && html.includes('.frame-neumorphic') && html.includes('.frame-glassmorphic') && html.includes('.frame-tactical') }
];

console.log('--- FRAMES & CONTACT ALIGNMENT VERIFICATION ---');
let allPass = true;
checks.forEach(c => {
  console.log(c.name + ':', c.pass ? 'PASS' : 'FAIL');
  if (!c.pass) allPass = false;
});
console.log('--- RESULT:', allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED', '---');
