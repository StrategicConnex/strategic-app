const fs = require('fs');
let js = fs.readFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/public/main.js', 'utf8');

js = js.replace(/document\.addEventListener\('DOMContentLoaded', \(\) => {/g, '');
const lastIndex = js.lastIndexOf('});');
if(lastIndex !== -1) {
    js = js.substring(0, lastIndex) + js.substring(lastIndex + 3);
}

fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/public/main.js', js, 'utf8');
