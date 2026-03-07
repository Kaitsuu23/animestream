// Simple icon generator using Canvas
// Run: node generate-icons.js

const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create a simple SVG icon
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const createSVG = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.15}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">AS</text>
</svg>`;
};

console.log('Generating PWA icons...');

sizes.forEach(size => {
  const svg = createSVG(size);
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  // For now, save as SVG (you can convert to PNG using sharp or canvas later)
  const svgPath = filepath.replace('.png', '.svg');
  fs.writeFileSync(svgPath, svg);
  console.log(`✓ Created ${filename.replace('.png', '.svg')}`);
});

console.log('\n✓ Icons generated successfully!');
console.log('\nNote: SVG icons created. For PNG conversion, install sharp:');
console.log('  npm install sharp');
console.log('  Then use sharp to convert SVG to PNG');
