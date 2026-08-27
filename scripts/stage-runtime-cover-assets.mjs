import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const source = join(root, 'web', 'public', 'skill-covers');
const destination = join(root, 'runtime', 'skill-covers');

if (!existsSync(source)) throw new Error('Skill cover source directory is missing.');
rmSync(destination, { recursive: true, force: true });

async function stageDirectory(sourceDirectory, relativeDirectory = '') {
  for (const entry of readdirSync(sourceDirectory, { withFileTypes: true })) {
    const relativePath = join(relativeDirectory, entry.name);
    const input = join(sourceDirectory, entry.name);
    const outputDirectory = join(destination, relativeDirectory);
    if (entry.isDirectory()) {
      await stageDirectory(input, relativePath);
      continue;
    }
    if (!entry.isFile()) continue;
    mkdirSync(outputDirectory, { recursive: true });
    if (/\.(mp4|webm)$/i.test(entry.name)) {
      copyFileSync(input, join(outputDirectory, entry.name));
      continue;
    }
    if (/\.(png|jpe?g|webp|svg)$/i.test(entry.name)) {
      await sharp(input)
        .resize({ width: 720, height: 960, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 72, effort: 4 })
        .toFile(join(outputDirectory, entry.name.replace(/\.(png|jpe?g|webp|svg)$/i, '.webp')));
    }
  }
}

await stageDirectory(source);
