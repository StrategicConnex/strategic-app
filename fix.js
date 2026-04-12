const fs = require('fs');
let jsx = fs.readFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/page.tsx', 'utf8');

jsx = jsx
  .replace(/viewbox="/gi, 'viewBox="')
  .replace(/stroke-width="/gi, 'strokeWidth="')
  .replace(/stroke-linecap="/gi, 'strokeLinecap="')
  .replace(/stroke-linejoin="/gi, 'strokeLinejoin="')
  .replace(/fill-rule="/gi, 'fillRule="')
  .replace(/clip-rule="/gi, 'clipRule="')
  .replace(/autocomplete="/gi, 'autoComplete="')
  .replace(/stroke-dasharray="/gi, 'strokeDasharray="')
  .replace(/stroke-dashoffset="/gi, 'strokeDashoffset="')
  .replace(/for="/gi, 'htmlFor="');

fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/page.tsx', jsx, 'utf8');
