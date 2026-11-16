const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  { name: 'Instagram Skeuomorphic Pass present', pass: html.includes('id="skeuo-instagram-pass"') },
  { name: 'WhatsApp Skeuomorphic Pass present', pass: html.includes('id="skeuo-whatsapp-pass"') },
  { name: 'Both cards have 4 metallic screws', pass: (html.match(/class="skeuo-screw/g) || []).length === 8 },
  { name: 'Both cards have punched lanyard slot', pass: (html.match(/class="skeuo-lanyard-slot"/g) || []).length === 2 },
  { name: 'Both cards have hardware LED socket & diode', pass: (html.match(/class="skeuo-led-socket"/g) || []).length === 2 },
  { name: 'Both cards have deep debossed QR wells', pass: (html.match(/class="skeuo-qr-well"/g) || []).length === 2 },
  { name: 'Both cards have specular acrylic glare overlays', pass: html.includes('id="skeuo-glare"') && html.includes('id="skeuo-wa-glare"') },
  { name: 'Both cards have tactile mechanical buttons', pass: (html.match(/class="skeuo-mech-btn font-mono"/g) || []).length === 2 },
  { name: 'WhatsApp phone number +91 90721 05574 present', pass: html.includes('+91 90721 05574') },
  { name: 'WhatsApp URL wa.me/919072105574 present', pass: html.includes('https://wa.me/919072105574') },
  { name: 'Direct Connect Grid is flex row (same line)', pass: html.includes('display: flex') && html.includes('flex-direction: row') && html.includes('flex-wrap: nowrap') },
  { name: '3D Spring Tilt physics for both passes (initSkeuoCards)', pass: html.includes('initSkeuoCards') && html.includes('skeuo-whatsapp-pass') },
  { name: 'Role is strictly UI Designer', pass: (html.match(/Full-Stack Developer/g) || []).length === 0 },
  { name: 'Zero availability statements', pass: (html.match(/available for/gi) || []).length === 0 && (html.match(/open to work/gi) || []).length === 0 }
];

console.log('--- DUAL SKEUOMORPHIC PASSES VERIFICATION ---');
let allPass = true;
checks.forEach(c => {
  console.log(c.name + ':', c.pass ? 'PASS' : 'FAIL');
  if (!c.pass) allPass = false;
});
console.log('--- RESULT:', allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED', '---');
