const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Preparing production build for Vercel...');
const outDir = path.join(__dirname, '.vercel', 'output');
const staticDir = path.join(outDir, 'static');

fs.mkdirSync(staticDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'config.json'), JSON.stringify({ version: 3 }, null, 2));
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(staticDir, 'index.html'));

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

copyDir(path.join(__dirname, 'public'), path.join(staticDir, 'public'));
console.log('📦 Static output ready. Deploying to Vercel...');

try {
  execSync('npx.cmd vercel deploy --prebuilt --prod --yes', { stdio: 'inherit' });
  console.log('✅ Successfully deployed to Vercel!');
} catch (e) {
  console.error('Deployment failed:', e.message);
}
