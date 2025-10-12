// generate_files.js
const fs = require('fs');
const path = require('path');

// === KONFIGURASI ===
const GITHUB_USERNAME = 'username'; // ganti username kamu
const REPO_NAME = 'emoji-gif-repo';
const BRANCH = 'main';
const ASSETS_FOLDER = path.join(__dirname, 'assets');

const JSON_FILE = path.join(__dirname, 'index.json');
const XML_FILE = path.join(__dirname, 'SE.xml');
const README_FILE = path.join(__dirname, 'README.md');

const START_MARK = '<!-- EMOJI_LIST_START -->';
const END_MARK = '<!-- EMOJI_LIST_END -->';

// ====== GENERATE JSON ======
function generateJSON() {
  const files = fs.readdirSync(ASSETS_FOLDER).filter(f => f.endsWith('.gif'));
  const emojis = files.map(file => ({
    name: path.basename(file, '.gif'),
    url: `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${REPO_NAME}/${BRANCH}/assets/${file}`,
  }));
  fs.writeFileSync(JSON_FILE, JSON.stringify({ emojis }, null, 2));
  console.log(`✅ index.json dibuat (${emojis.length} emoji)`);
  return emojis;
}

// ====== GENERATE XML ======
function generateXML(emojis) {
  const xmlContent =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<emojis>\n' +
    emojis
      .map(e => `  <emoji name="${e.name}" url="${e.url}" />`)
      .join('\n') +
    '\n</emojis>\n';
  fs.writeFileSync(XML_FILE, xmlContent);
  console.log('✅ SE.xml dibuat');
}

// ====== UPDATE README ======
function updateReadme(emojis) {
  const emojiMarkdown = emojis.map(e => `![${e.name}](${e.url})`).join(' ');
  let readme = fs.existsSync(README_FILE)
    ? fs.readFileSync(README_FILE, 'utf8')
    : '# Emoji GIF Repo\n\n';

  const block = `${START_MARK}\n${emojiMarkdown}\n${END_MARK}`;
  if (readme.includes(START_MARK) && readme.includes(END_MARK)) {
    const regex = new RegExp(`${START_MARK}[\\s\\S]*${END_MARK}`, 'g');
    readme = readme.replace(regex, block);
  } else {
    readme += `\n\n${block}\n`;
  }

  fs.writeFileSync(README_FILE, readme);
  console.log('✅ README.md diperbarui');
}

// ====== MAIN ======
function main() {
  const emojis = generateJSON();
  generateXML(emojis);
  updateReadme(emojis);
}

main();
                           
