import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const maintainerRoot = path.join(root, "docs", "maintainers");
const files = [path.join(root, "CONTRIBUTING.md")];
for (const entry of await readdir(maintainerRoot, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".md")) files.push(path.join(maintainerRoot, entry.name));
}

let links = 0;
for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const link = match[1];
    if (link.startsWith("http") || link.startsWith("#")) continue;
    const localPath = link.split("#", 1)[0];
    await access(path.resolve(path.dirname(file), localPath));
    links += 1;
  }
}

const contributing = await readFile(path.join(root, "CONTRIBUTING.md"), "utf8");
for (const required of ["adding-skills.md", "importing-external-projects.md", "skills:intake", "intake/external-skills/"]) {
  if (!contributing.includes(required)) throw new Error(`CONTRIBUTING.md is missing maintainer entrypoint: ${required}`);
}

console.log(`Valid maintainer docs: ${files.length} files and ${links} local links.`);
