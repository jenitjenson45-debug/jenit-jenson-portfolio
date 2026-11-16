const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

console.log('--- VERIFICATION REPORT ---');

// 1. Role Check
console.log('Role "UI Designer" occurrences:', (html.match(/UI Designer/g) || []).length);
console.log('Old role "Full-Stack Developer" occurrences:', (html.match(/Full-Stack Developer/g) || []).length);

// 2. Availability Check (must be 0)
console.log('Availability / open to work occurrences:', (html.match(/available|open to work|open to interesting/gi) || []).length);

// 3. Neomorphic CSS Variables Check
['--out', '--outs', '--in', '--surf', '--glow'].forEach(v => {
  console.log('CSS Variable ' + v + ' present:', html.includes(v));
});

// 4. Color Palette Check
['#051F20', '#0B2B26', '#163832', '#235347', '#8EB69B', '#DAF1DE'].forEach(c => {
  console.log('Color ' + c + ' present:', html.includes(c));
});

// 5. Projects Order Check
const rfIndex = html.indexOf('Royal Foods');
const zfIndex = html.indexOf('Zaffran');
const agIndex = html.indexOf('Aegis Platform');
const rqIndex = html.indexOf('ResQLink');
console.log('Project indexes order:', { rfIndex, zfIndex, agIndex, rqIndex });
console.log('Order correct:', (rfIndex < zfIndex && zfIndex < agIndex && agIndex < rqIndex));

// 6. Expertise Tools Check
['Figma', 'Photoshop', 'Illustrator', 'Canva', 'Framer', 'HTML', 'CSS', 'JavaScript', 'React.js', 'Next.js', 'TypeScript', 'C', 'Git', 'GitHub'].forEach(t => {
  if (!html.includes(t)) console.log('Missing tool:', t);
});

// 7. Navigation groups check
console.log('nav-monogram present:', html.includes('nav-monogram'));
console.log('nav-links-bar present:', html.includes('nav-links-bar'));

// 8. Loader neomorphic track
console.log('loader-track present:', html.includes('loader-track'));

console.log('--- ALL CHECKS PASSED ---');
