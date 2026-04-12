const fs = require('fs');
let jsx = fs.readFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/page.tsx', 'utf8');

if(!jsx.includes('next/image')) {
  jsx = jsx.replace('import React, { useEffect } from "react";', 'import React, { useEffect } from "react";\nimport Image from "next/image";');
}

// Transform absolute images
jsx = jsx.replace(/<img(.*?)src="images\/([^"]+)"(.*?)(\/?)>/gi, (match, prefix, img, suffix) => {
  return `<Image${prefix}src="/images/${img}" width={800} height={600} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} unoptimized${suffix}/>`;
});
jsx = jsx.replace(/<img(.*?)src="logo\.png"(.*?)(\/?)>/gi, `<Image$1src="/logo.png" width={200} height={80} style={{ width: 'auto', height: '100%', objectFit: 'contain' }} unoptimized$2/>`);

fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/page.tsx', jsx, 'utf8');
