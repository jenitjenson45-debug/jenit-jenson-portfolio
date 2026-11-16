const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const checks = [
  { name: 'WhatsApp phone number 9072105574 present', pass: html.includes('9072105574') },
  { name: 'Formatted WhatsApp phone +91 90721 05574 present', pass: html.includes('+91 90721 05574') },
  { name: 'WhatsApp URL wa.me/919072105574 present', pass: html.includes('https://wa.me/919072105574') },
  { name: 'Direct Connect Dual Grid present', pass: html.includes('class="direct-connect-grid"') },
  { name: 'Neumorphic Pass container present', pass: html.includes('class="neu-pass"') },
  { name: 'Neumorphic Inset QR Well present', pass: html.includes('class="neu-qr-well"') },
  { name: 'Neumorphic Soft Inset Phone Plate present', pass: html.includes('class="neu-phone-plate"') },
  { name: 'Neumorphic Action Button present', pass: html.includes('class="neu-action-btn font-mono"') },
  { name: 'Neumorphic QR initialization JS present', pass: html.includes('initNeuWhatsAppQr') },
  { name: 'Social button for WhatsApp in button group', pass: html.includes('href="https://wa.me/919072105574" target="_blank" rel="noopener" class="social-btn font-mono"') },
  { name: 'Skeuomorphic Instagram Pass still present', pass: html.includes('id="skeuo-instagram-pass"') && html.includes('instagram.com/_jenit.__') }
];

console.log('--- WHATSAPP & DUAL CONNECT VERIFICATION ---');
let allPass = true;
checks.forEach(c => {
  console.log(c.name + ':', c.pass ? 'PASS' : 'FAIL');
  if (!c.pass) allPass = false;
});
console.log('--- RESULT:', allPass ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED', '---');
