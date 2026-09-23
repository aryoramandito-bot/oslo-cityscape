const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = path.resolve(__dirname, '..', 'public', 'assets', 'categories');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Color neutral palette:
// Primary: Warm Charcoal / Neutral Graphite (#292524)
// Secondary: Muted Warm Stone (#78716c)
// Highlight: Soft Linen Accent (#d6d3d1)
// Oslo Rose Spark: (#d85d5d)

const icons = {
  'category-workshop': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <!-- Artisan Palette / Craft Base Ring -->
    <circle cx="256" cy="256" r="210" fill="none" stroke="#e7e5e4" stroke-width="16" stroke-dasharray="12 12"/>
    <!-- Flowing craft ribbon / Batik wax line -->
    <path d="M120 360 C160 300, 210 370, 270 320 C320 280, 360 310, 400 260" fill="none" stroke="#a8a29e" stroke-width="18" stroke-linecap="round"/>
    <!-- Stylized Artisan Canting / Craft Pen Tool -->
    <g transform="translate(40, -10)">
      <!-- Wood Handle -->
      <path d="M140 370 L250 260" stroke="#292524" stroke-width="26" stroke-linecap="round"/>
      <path d="M130 380 L160 350" stroke="#78716c" stroke-width="14" stroke-linecap="round"/>
      <!-- Brass Ferrule -->
      <path d="M245 265 L270 240" stroke="#78716c" stroke-width="32" stroke-linecap="round"/>
      <!-- Copper Reservoir Bowl -->
      <path d="M265 245 C285 225, 325 220, 345 240 C365 260, 360 300, 340 320 C320 338, 280 335, 260 315 Z" fill="#292524" fill-opacity="0.08" stroke="#292524" stroke-width="20" stroke-linejoin="round"/>
      <!-- Precision Spout / Nib -->
      <path d="M342 245 C365 245, 385 260, 385 285 C385 305, 370 320, 350 320" fill="none" stroke="#292524" stroke-width="18" stroke-linecap="round"/>
      <!-- Liquid Rose Wax Droplet -->
      <circle cx="350" cy="336" r="12" fill="#d85d5d"/>
    </g>
    <!-- Geometric Artisan Sparkle -->
    <path d="M160 130 L160 170 M140 150 L180 150" stroke="#d85d5d" stroke-width="14" stroke-linecap="round"/>
    <circle cx="380" cy="150" r="10" fill="#78716c"/>
    <circle cx="120" cy="240" r="8" fill="#a8a29e"/>
  </svg>`,

  'category-walking': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <!-- Outer Precision Compass Dial -->
    <circle cx="256" cy="256" r="210" fill="none" stroke="#292524" stroke-width="20"/>
    <circle cx="256" cy="256" r="185" fill="none" stroke="#e7e5e4" stroke-width="8"/>
    <!-- Compass Cardinal Ticks -->
    <line x1="256" y1="56" x2="256" y2="82" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <line x1="256" y1="430" x2="256" y2="456" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <line x1="56" y1="256" x2="82" y2="256" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <line x1="430" y1="256" x2="456" y2="256" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <!-- Cardinal Labels (Subtle) -->
    <circle cx="256" cy="100" r="6" fill="#d85d5d"/>
    <!-- Diagonal Subtle Points -->
    <line x1="120" y1="120" x2="135" y2="135" stroke="#a8a29e" stroke-width="10" stroke-linecap="round"/>
    <line x1="392" y1="120" x2="377" y2="135" stroke="#a8a29e" stroke-width="10" stroke-linecap="round"/>
    <line x1="120" y1="392" x2="135" y2="377" stroke="#a8a29e" stroke-width="10" stroke-linecap="round"/>
    <line x1="392" y1="392" x2="377" y2="377" stroke="#a8a29e" stroke-width="10" stroke-linecap="round"/>
    <!-- Dynamic Explorer Compass Needle -->
    <!-- North Pointer (Oslo Rose) -->
    <polygon points="256,120 286,256 256,236" fill="#d85d5d"/>
    <polygon points="256,120 226,256 256,236" fill="#c64f4f"/>
    <!-- South Pointer (Neutral Charcoal) -->
    <polygon points="256,392 286,256 256,276" fill="#292524"/>
    <polygon points="256,392 226,256 256,276" fill="#44403c"/>
    <!-- Center Pivot Jewel -->
    <circle cx="256" cy="256" r="22" fill="#ffffff" stroke="#292524" stroke-width="12"/>
    <circle cx="256" cy="256" r="8" fill="#d85d5d"/>
    <!-- Winding Trail Footpath Path -->
    <path d="M160 370 Q 200 420 240 400 T 320 380" fill="none" stroke="#78716c" stroke-width="12" stroke-linecap="round" stroke-dasharray="10 14"/>
  </svg>`,

  'category-culinary': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <!-- Artisanal Ceramic Bowl Base Rim -->
    <path d="M96 240 C96 350, 160 410, 256 410 C352 410, 416 350, 416 240 Z" fill="#292524" fill-opacity="0.06" stroke="#292524" stroke-width="22" stroke-linejoin="round"/>
    <!-- Bowl Foot Ring -->
    <path d="M190 410 L180 436 L332 436 L322 410" fill="none" stroke="#292524" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Bowl Lip Rim -->
    <line x1="80" y1="240" x2="432" y2="240" stroke="#292524" stroke-width="22" stroke-linecap="round"/>
    <!-- Broth Level Interior Line -->
    <path d="M120 270 Q 256 285 392 270" fill="none" stroke="#78716c" stroke-width="14" stroke-linecap="round"/>
    <!-- Ceramic Tasting Spoon Resting Across Bowl -->
    <g transform="rotate(-28 320 220)">
      <path d="M220 220 L370 220" stroke="#292524" stroke-width="20" stroke-linecap="round"/>
      <ellipse cx="200" cy="220" rx="36" ry="24" fill="#ffffff" stroke="#292524" stroke-width="18"/>
      <!-- Tasting drop on spoon -->
      <circle cx="200" cy="220" r="8" fill="#d85d5d"/>
    </g>
    <!-- Minimalist Aromatic Steam Arcs -->
    <path d="M210 180 C200 150, 220 120, 210 90" fill="none" stroke="#78716c" stroke-width="16" stroke-linecap="round"/>
    <path d="M256 195 C246 160, 266 130, 256 95" fill="none" stroke="#d85d5d" stroke-width="18" stroke-linecap="round"/>
    <path d="M302 180 C292 150, 312 120, 302 90" fill="none" stroke="#78716c" stroke-width="16" stroke-linecap="round"/>
    <!-- Delicate Culinary Spark -->
    <path d="M380 140 L380 165 M368 152 L392 152" stroke="#d85d5d" stroke-width="10" stroke-linecap="round"/>
  </svg>`,

  'category-performance': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <!-- Outer Cultural Frame Halo -->
    <circle cx="256" cy="256" r="210" fill="none" stroke="#e7e5e4" stroke-width="16"/>
    <!-- Classical Theater Mask & Gamelan Gong Silhouette -->
    <!-- Traditional Court Crown / Crest (Makuta) -->
    <path d="M256 90 L280 160 L330 140 L310 200 L370 200 L310 240 L256 220 L202 240 L142 200 L202 200 L182 140 L232 160 Z" fill="#292524" fill-opacity="0.08" stroke="#292524" stroke-width="18" stroke-linejoin="round"/>
    <!-- Crown Jewel -->
    <circle cx="256" cy="180" r="14" fill="#d85d5d"/>
    <!-- Classical Artistic Mask Arc -->
    <path d="M150 250 C150 350, 200 410, 256 410 C312 410, 362 350, 362 250" fill="none" stroke="#292524" stroke-width="22" stroke-linecap="round"/>
    <!-- Serene Eyes -->
    <path d="M190 280 Q 215 265 240 280" fill="none" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <path d="M272 280 Q 297 265 322 280" fill="none" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <!-- Royal Bindi / Third Eye Point -->
    <circle cx="256" cy="260" r="7" fill="#78716c"/>
    <!-- Smile Arc -->
    <path d="M226 345 Q 256 365 286 345" fill="none" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <!-- Acoustic Resonance Musical Chime Waves -->
    <path d="M100 220 C85 240, 85 270, 100 290" fill="none" stroke="#78716c" stroke-width="14" stroke-linecap="round"/>
    <path d="M412 220 C427 240, 427 270, 412 290" fill="none" stroke="#78716c" stroke-width="14" stroke-linecap="round"/>
    <!-- Musical Note Star -->
    <path d="M390 120 L390 150 M375 135 L405 135" stroke="#d85d5d" stroke-width="12" stroke-linecap="round"/>
  </svg>`,

  'category-festival': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <!-- Festival Bunting Ribbon -->
    <path d="M70 140 Q 256 190 442 140" fill="none" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <!-- Triangle Bunting Flags -->
    <polygon points="120,152 155,210 170,163" fill="#d85d5d"/>
    <polygon points="195,168 230,225 245,173" fill="#78716c"/>
    <polygon points="270,173 305,225 320,168" fill="#292524"/>
    <polygon points="345,163 360,210 395,152" fill="#d85d5d"/>
    <!-- Traditional Celebration Lantern / Pavilion -->
    <!-- Lantern Roof Canopy -->
    <path d="M190 250 L256 200 L322 250 Z" fill="#292524" stroke="#292524" stroke-width="18" stroke-linejoin="round"/>
    <line x1="256" y1="170" x2="256" y2="200" stroke="#292524" stroke-width="16" stroke-linecap="round"/>
    <!-- Roof finial -->
    <circle cx="256" cy="165" r="10" fill="#d85d5d"/>
    <!-- Lantern Core Body -->
    <rect x="200" y="250" width="112" height="130" rx="20" fill="#292524" fill-opacity="0.06" stroke="#292524" stroke-width="20"/>
    <!-- Internal Radiant Glow Lines -->
    <line x1="256" y1="270" x2="256" y2="360" stroke="#d85d5d" stroke-width="16" stroke-linecap="round"/>
    <line x1="228" y1="285" x2="228" y2="345" stroke="#78716c" stroke-width="12" stroke-linecap="round"/>
    <line x1="284" y1="285" x2="284" y2="345" stroke="#78716c" stroke-width="12" stroke-linecap="round"/>
    <!-- Hanging Ceremonial Tassel -->
    <path d="M256 380 L256 425 M248 435 L264 435 M244 445 L268 445" stroke="#292524" stroke-width="14" stroke-linecap="round"/>
    <!-- Celebration Celestial Sparks -->
    <g transform="translate(90, 260)">
      <path d="M20 0 L20 40 M0 20 L40 20" stroke="#78716c" stroke-width="12" stroke-linecap="round"/>
    </g>
    <g transform="translate(380, 260)">
      <path d="M20 0 L20 40 M0 20 L40 20" stroke="#d85d5d" stroke-width="14" stroke-linecap="round"/>
    </g>
    <circle cx="140" cy="360" r="8" fill="#d85d5d"/>
    <circle cx="370" cy="360" r="8" fill="#78716c"/>
  </svg>`,

  'category-all': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <!-- Double-Bezel Calendar Outline -->
    <rect x="80" y="100" width="352" height="340" rx="56" fill="#292524" fill-opacity="0.05" stroke="#292524" stroke-width="22"/>
    <!-- Top Binding Header Bar -->
    <path d="M80 180 L432 180" stroke="#292524" stroke-width="22" stroke-linecap="square"/>
    <!-- Calendar Hanging Rings -->
    <line x1="160" y1="65" x2="160" y2="125" stroke="#292524" stroke-width="20" stroke-linecap="round"/>
    <line x1="352" y1="65" x2="352" y2="125" stroke="#292524" stroke-width="20" stroke-linecap="round"/>
    <!-- Timetable Grid Cells -->
    <!-- Row 1 -->
    <rect x="135" y="225" width="65" height="55" rx="14" fill="#292524"/>
    <rect x="225" y="225" width="65" height="55" rx="14" fill="#78716c" fill-opacity="0.2" stroke="#78716c" stroke-width="10"/>
    <rect x="315" y="225" width="65" height="55" rx="14" fill="#78716c" fill-opacity="0.2" stroke="#78716c" stroke-width="10"/>
    <!-- Row 2 -->
    <rect x="135" y="315" width="65" height="55" rx="14" fill="#78716c" fill-opacity="0.2" stroke="#78716c" stroke-width="10"/>
    <!-- Active Selected Date in Oslo Rose -->
    <rect x="225" y="315" width="65" height="55" rx="14" fill="#d85d5d"/>
    <rect x="315" y="315" width="65" height="55" rx="14" fill="#78716c" fill-opacity="0.2" stroke="#78716c" stroke-width="10"/>
    <!-- Spark Indicator on Active Date -->
    <circle cx="257.5" cy="342.5" r="9" fill="#ffffff"/>
  </svg>`
};

console.log('Writing SVGs and rendering transparent vector PNGs...');

for (const [name, svgContent] of Object.entries(icons)) {
  const svgPath = path.join(outDir, `${name}.svg`);
  const pngPath = path.join(outDir, `${name}.png`);
  
  // 1. Save SVG
  fs.writeFileSync(svgPath, svgContent);
  console.log(`Saved SVG: ${name}.svg`);

  // 2. Prepare HTML wrapper for Edge headless
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 512px;
      height: 512px;
      background: transparent !important;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    svg {
      width: 480px;
      height: 480px;
    }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

  const tempHtmlPath = path.resolve(__dirname, `temp_${name}.html`);
  fs.writeFileSync(tempHtmlPath, htmlContent);

  const htmlUri = 'file:///' + tempHtmlPath.replace(/\\/g, '/');
  
  // 3. Render high-res 512x512 transparent PNG
  const cmd = `"${edgePath}" --headless --disable-gpu --default-background-color=00000000 --window-size=512,512 --screenshot="${pngPath}" "${htmlUri}"`;
  execSync(cmd);
  console.log(`Rendered PNG: ${name}.png (${fs.statSync(pngPath).size} bytes)`);

  // Clean up temp html
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }
}

// Copy to dist/assets/categories if dist exists
const distDir = path.resolve(__dirname, '..', 'dist', 'assets', 'categories');
if (fs.existsSync(distDir)) {
  for (const name of Object.keys(icons)) {
    fs.copyFileSync(path.join(outDir, `${name}.png`), path.join(distDir, `${name}.png`));
    fs.copyFileSync(path.join(outDir, `${name}.svg`), path.join(distDir, `${name}.svg`));
  }
  console.log('Copied all category assets to dist/assets/categories/');
}

console.log('All category vector logos created successfully!');
