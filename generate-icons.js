// Icon generator using your custom logo/image
// Run: node generate-icons.js <path-to-your-logo>
// Example: node generate-icons.js logo.png

const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.error('❌ Sharp is not installed!');
  console.error('Install it with: npm install sharp');
  process.exit(1);
}

// Get logo path from command line argument
const logoPath = process.argv[2];

if (!logoPath) {
  console.error('❌ Please provide a logo file path!');
  console.error('Usage: node generate-icons.js <path-to-your-logo>');
  console.error('Example: node generate-icons.js logo.png');
  console.error('');
  console.error('Supported formats: PNG, JPG, JPEG, SVG, WEBP');
  process.exit(1);
}

const fullLogoPath = path.resolve(logoPath);

if (!fs.existsSync(fullLogoPath)) {
  console.error(`❌ Logo file not found: ${fullLogoPath}`);
  process.exit(1);
}

console.log(`📸 Using logo: ${fullLogoPath}`);
console.log('🎨 Generating PWA icons...\n');

// Generate icons for all sizes
async function generateIcons() {
  try {
    for (const size of sizes) {
      const filename = `icon-${size}x${size}.png`;
      const filepath = path.join(iconsDir, filename);

      await sharp(fullLogoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background
        })
        .png()
        .toFile(filepath);

      console.log(`✓ Created ${filename}`);
    }

    console.log('\n✅ All icons generated successfully!');
    console.log(`📁 Icons saved to: ${iconsDir}`);
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
