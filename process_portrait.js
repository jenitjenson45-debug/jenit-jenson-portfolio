const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcJpg = 'C:/Users/jenit/.gemini/antigravity/brain/8062ee3f-de61-4b41-b62b-e94e299b49ca/.user_uploaded/media_1794765344267_4fdcef99.jpg';

// Probe dimensions
const probe = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${srcJpg}"`).toString().trim();
const [width, height] = probe.split('x').map(Number);
console.log('Image dimensions:', width, height);

// Convert to raw RGBA
const rawPath = path.resolve('temp_raw.rgba');
execSync(`ffmpeg -y -i "${srcJpg}" -f rawvideo -pix_fmt rgba "${rawPath}"`);
const raw = fs.readFileSync(rawPath);
console.log('Raw buffer length:', raw.length, 'expected:', width * height * 4);

// Flood-fill from edges to find background white pixels
// A pixel is background if it's connected to border and is near white (R, G, B > 240 or similar, or close to white)
const isWhite = (x, y) => {
  const idx = (y * width + x) * 4;
  const r = raw[idx];
  const g = raw[idx + 1];
  const b = raw[idx + 2];
  // check if color is near white: white background in this drawing is usually > 245
  return (r > 238 && g > 238 && b > 238);
};

const visited = new Uint8Array(width * height);
const queue = [];

// Seed edges
for (let x = 0; x < width; x++) {
  if (isWhite(x, 0)) { queue.push((0 << 16) | x); visited[0 * width + x] = 1; }
  if (isWhite(x, height - 1)) { queue.push(((height - 1) << 16) | x); visited[(height - 1) * width + x] = 1; }
}
for (let y = 0; y < height; y++) {
  if (isWhite(0, y) && !visited[y * width + 0]) { queue.push((y << 16) | 0); visited[y * width + 0] = 1; }
  if (isWhite(width - 1, y) && !visited[y * width + (width - 1)]) { queue.push((y << 16) | (width - 1)); visited[y * width + (width - 1)] = 1; }
}

let head = 0;
while (head < queue.length) {
  const val = queue[head++];
  const cx = val & 0xffff;
  const cy = val >> 16;
  
  const neighbors = [
    [cx - 1, cy],
    [cx + 1, cy],
    [cx, cy - 1],
    [cx, cy + 1]
  ];
  
  for (let i = 0; i < 4; i++) {
    const [nx, ny] = neighbors[i];
    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
      const nidx = ny * width + nx;
      if (!visited[nidx] && isWhite(nx, ny)) {
        visited[nidx] = 1;
        queue.push((ny << 16) | nx);
      }
    }
  }
}

console.log('Background pixels found:', queue.length);

// Alpha channel: 0 for background, 255 for foreground, with 1px soft feather
const alpha = new Uint8Array(width * height);
for (let i = 0; i < width * height; i++) {
  alpha[i] = visited[i] ? 0 : 255;
}

// 1px feather: for pixels adjacent to background, feather alpha
const feathered = new Uint8Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = y * width + x;
    if (alpha[idx] === 0) {
      feathered[idx] = 0;
    } else {
      let bgCount = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            if (alpha[ny * width + nx] === 0) bgCount++;
          }
        }
      }
      if (bgCount > 0) {
        feathered[idx] = Math.round(255 * (1 - bgCount / 10)); // soft feather
      } else {
        feathered[idx] = 255;
      }
    }
  }
}

// Apply alpha to raw
for (let i = 0; i < width * height; i++) {
  raw[i * 4 + 3] = feathered[i];
}

fs.writeFileSync(rawPath, raw);

// Encode with ffmpeg to transparent WebP
const outCutoutWebp = path.resolve('public/images/jenit-cutout.webp');
execSync(`ffmpeg -y -f rawvideo -pix_fmt rgba -s ${width}x${height} -i "${rawPath}" -c:v libwebp -quality 90 "${outCutoutWebp}"`);
console.log('Created jenit-cutout.webp, size:', fs.statSync(outCutoutWebp).size);

// Create About section crop (face & upper body, 4:5 aspect ratio)
// Let's find foreground bounds
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (feathered[y * width + x] > 50) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log('Foreground bounds:', { minX, maxX, minY, maxY });

// Crop face/upper-body for About:
// The main front face is around x: ~400 to 750, y: ~150 to 550. Or upper half:
const cropW = Math.min(width, Math.round(width * 0.75));
const cropH = Math.round(cropW * 1.25); // 4:5 aspect ratio
const cropX = Math.round((width - cropW) / 2);
const cropY = Math.max(0, minY);

const outAboutWebp = path.resolve('public/images/jenit-about-crop.webp');
execSync(`ffmpeg -y -i "${outCutoutWebp}" -filter:v "crop=${cropW}:${cropH}:${cropX}:${cropY}" -c:v libwebp -quality 90 "${outAboutWebp}"`);
console.log('Created jenit-about-crop.webp, size:', fs.statSync(outAboutWebp).size);

// Cleanup raw file
fs.unlinkSync(rawPath);

// Save base64 data URIs
const heroB64 = fs.readFileSync(outCutoutWebp).toString('base64');
const aboutB64 = fs.readFileSync(outAboutWebp).toString('base64');
fs.writeFileSync('public/images/portrait_data.json', JSON.stringify({
  heroDataUri: 'data:image/webp;base64,' + heroB64,
  aboutDataUri: 'data:image/webp;base64,' + aboutB64
}));
console.log('Saved portrait_data.json successfully!');
