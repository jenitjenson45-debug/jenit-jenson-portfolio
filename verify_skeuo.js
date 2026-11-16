const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  { name: 'Instagram URL present in index.html', pass: html.includes('https://www.instagram.com/_jenit.__?cplk=MXJxdG5idWpzZ296bg==') },
  { name: 'Instagram handle @_jenit.__ present', pass: html.includes('@_jenit.__') },
  { name: 'Instagram QR WebP data URI present', pass: html.includes('Instagram QR Code') },
  { name: 'Skeuomorphic Pass container present', pass: html.includes('class="skeuo-pass"') },
  { name: 'Skeuomorphic Screws (4 corner screws)', pass: html.includes('screw-tl') && html.includes('screw-tr') && html.includes('screw-bl') && html.includes('screw-br') },
  { name: 'Skeuomorphic Lanyard Slot', pass: html.includes('class="skeuo-lanyard-slot"') },
  { name: 'Skeuomorphic Hardware Status LED', pass: html.includes('skeuo-led-socket') && html.includes('skeuo-led-diode') },
  { name: 'Skeuomorphic QR Well (Debossed Chamber)', pass: html.includes('class="skeuo-qr-well"') },
  { name: 'Skeuomorphic Specular Glare Reflection', pass: html.includes('class="skeuo-glare"') },
  { name: 'Tactile Mechanical Push Button', pass: html.includes('class="skeuo-mech-btn font-mono"') },
  { name: 'Skeuomorphic 3D Spring Tilt JS', pass: html.includes('initSkeuoInstagramCard') },
  { name: 'Social button for Instagram in button group', pass: html.includes('href="https://www.instagram.com/_jenit.__?cplk=MXJxdG5idWpzZ296bg==" target="_blank" rel="noopener" class="social-btn font-mono"') }
];

console.log('--- SKEUOMORPHIC INSTAGRAM VERIFICATION ---');
let allPass = true;
checks.forEach(c => {
  console.log(c.name + ':', c.pass ? 'PASS' : 'FAIL');
  if (!c.pass) allPass = false;
});
console.log('--- RESULT:', allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED', '---');
