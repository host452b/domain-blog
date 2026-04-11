import { fontSplit } from 'cn-font-split';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const fonts = [
  { name: 'LXGWWenKai', file: 'LXGWWenKai-Regular.ttf', family: 'LXGWWenKai' },
  { name: 'LXGWNeoXiHei', file: 'LXGWNeoXiHei-Regular.ttf', family: 'LXGWNeoXiHei' },
  { name: 'LXGWNeoZhiSong', file: 'LXGWNeoZhiSong-Regular.ttf', family: 'LXGWNeoZhiSong' },
  { name: 'LXGWZhenKai', file: 'LXGWZhenKai-Regular.ttf', family: 'LXGWZhenKai' },
];

for (const font of fonts) {
  const fontPath = path.join(projectRoot, 'fonts', font.file);
  const outDir = path.join(projectRoot, 'public', 'fonts', font.name);

  console.log(`Splitting ${font.name}...`);

  const inputBuffer = new Uint8Array(fs.readFileSync(fontPath).buffer);

  await fontSplit({
    input: inputBuffer,
    outDir,
    chunkSize: 70 * 1024,
    css: {
      fontFamily: font.family,
    },
    testHtml: false,
    reporter: false,
    silent: true,
  });

  console.log(`Done: ${font.name} -> public/fonts/${font.name}/`);
}

console.log('All fonts split successfully.');
