const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const requiredIds = [
  'loader', 'loader-bar', 'loader-pct',
  'site-header', 'menu-btn', 'drawer-close', 'mobile-drawer',
  'custom-cursor', 'webgl-canvas', 'scroll-progress',
  'hero-name-heading', 'hero-portrait-fg', 'hero-bl', 'hero-br',
  'hero-vertical-text', 'hero-scroll-hint',
  'about-outline-frame', 'about-portrait-frame',
  'projects-container',
  'expertise-note', 'expertise-closing-text'
];

let missing = [];
requiredIds.forEach(id => {
  if (!html.includes('id="' + id + '"')) {
    missing.push(id);
  }
});

console.log('Checked', requiredIds.length, 'IDs. Missing IDs:', missing);

// Check palette colors
const colors = ['#051F20', '#0B2B26', '#163832', '#235347', '#8EB69B', '#DAF1DE'];
console.log('Palette presence:');
colors.forEach(c => console.log(c, html.includes(c)));

// Check role
console.log('Role "UI Designer" occurrences:', (html.match(/UI Designer/g) || []).length);
console.log('Old role "Full-Stack Developer" occurrences:', (html.match(/Full-Stack Developer/g) || []).length);
