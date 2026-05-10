const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, 'public', 'images');
const PUBLIC_DIR = path.join(__dirname, 'public');

async function compressImage(srcPath, destPath, options = {}) {
  const { maxWidth, quality = 80 } = options;
  try {
    let pipeline = sharp(srcPath);
    
    // Get metadata to inspect current dimensions
    const metadata = await pipeline.metadata();
    
    if (maxWidth && metadata.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }
    
    await pipeline
      .webp({ quality })
      .toFile(destPath);
      
    const originalSize = fs.statSync(srcPath).size;
    const compressedSize = fs.statSync(destPath).size;
    
    console.log(`✓ Optimized: ${path.basename(srcPath)} -> ${path.basename(destPath)}`);
    console.log(`  Size: ${(originalSize / 1024).toFixed(1)} KB -> ${(compressedSize / 1024).toFixed(1)} KB (${((compressedSize / originalSize) * 100).toFixed(1)}%)`);
  } catch (error) {
    console.error(`✗ Error processing ${path.basename(srcPath)}:`, error.message);
  }
}

async function run() {
  console.log('Starting image compression and WebP conversion...');
  
  // 1. Process Logo
  const logoSrc = path.join(PUBLIC_DIR, 'logo.png');
  const logoDest = path.join(PUBLIC_DIR, 'logo.webp');
  if (fs.existsSync(logoSrc)) {
    console.log('\n--- Optimizing Logo ---');
    await compressImage(logoSrc, logoDest, { maxWidth: 400, quality: 85 });
  } else {
    console.warn(`Warn: logo.png not found at ${logoSrc}`);
  }
  
  // 2. Process public/images folder
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Error: Images directory not found at ${IMAGES_DIR}`);
    return;
  }
  
  const files = fs.readdirSync(IMAGES_DIR);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));
  
  console.log(`\n--- Optimizing ${pngFiles.length} images in public/images ---`);
  
  for (const file of pngFiles) {
    const srcPath = path.join(IMAGES_DIR, file);
    const destName = file.substring(0, file.lastIndexOf('.')) + '.webp';
    const destPath = path.join(IMAGES_DIR, destName);
    
    // Set size budget constraints
    let maxWidth = 800; // Default width for cards
    if (file === 'seo_errors_hero.png') {
      maxWidth = 1600; // Large hero visual
    } else if (file.startsWith('industry_') || file.startsWith('about_')) {
      maxWidth = 1200; // Mid-size section visuals
    }
    
    await compressImage(srcPath, destPath, { maxWidth, quality: 80 });
  }
  
  console.log('\nAll image optimizations completed successfully!');
}

run();
