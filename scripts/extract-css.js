const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('nexbash.html', 'utf8');
const match = html.match(/<style>([\s\S]*?)<\/style>/);
if (!match) {
  console.error('No style block found');
  process.exit(1);
}

let css = match[1]
  .replace(/url\('assets\//g, "url('/assets/")
  .replace(/url\("assets\//g, 'url("/assets/');

fs.mkdirSync('app', { recursive: true });
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync(path.join('app', 'globals.css'), css.trim() + '\n');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

if (fs.existsSync('assets')) {
  copyDir('assets', path.join('public', 'assets'));
}

console.log('Extracted CSS and copied assets');
