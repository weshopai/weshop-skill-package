#!/usr/bin/env node

import { createHash } from "node:crypto";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { extname, resolve } from "node:path";
import COS from "cos-nodejs-sdk-v5";

const usage = "npm run media:upload -- <cover|source|video> <skill-id> <file> [--index <n>] [--dry-run]";
const args = process.argv.slice(2);
const dryRunIndex = args.indexOf("--dry-run");
const dryRun = dryRunIndex >= 0;
if (dryRun) args.splice(dryRunIndex, 1);
const indexFlag = args.indexOf("--index");
let sourceIndex;
if (indexFlag >= 0) {
  sourceIndex = Number(args[indexFlag + 1]);
  args.splice(indexFlag, 2);
}

const [kind, skillId, inputArg] = args;
if (!kind || !skillId || !inputArg || args.length !== 3) throw new Error(usage);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skillId)) throw new Error("Skill ID must be lowercase kebab-case.");
if (sourceIndex !== undefined && (kind !== "source" || !Number.isInteger(sourceIndex) || sourceIndex < 1)) {
  throw new Error("--index accepts a positive integer and is valid only for source media.");
}

const media = {
  cover: { directory: "coverImage", extensions: new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]) },
  source: { directory: "sourceImage", extensions: new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]) },
  video: { directory: "coverVideo", extensions: new Set([".mp4", ".webm"]) },
}[kind];
if (!media) throw new Error(`Unknown media kind: ${kind}. ${usage}`);

const input = resolve(inputArg);
if (!existsSync(input) || !statSync(input).isFile()) throw new Error(`Input file not found: ${input}`);
const extension = extname(input).toLowerCase();
if (!media.extensions.has(extension)) throw new Error(`${kind} does not accept ${extension || "an extensionless file"}.`);

function loadPrivateEnvironment() {
  const path = `${homedir()}/.config/weshop/tencent-cos.env`;
  if (!existsSync(path)) return;
  for (const rawLine of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = line.match(/^export\s+([A-Z][A-Z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    let value = match[2].trim();
    if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) value = value.slice(1, -1);
    process.env[match[1]] = value;
  }
}

loadPrivateEnvironment();
const required = ["TENCENTCLOUD_SECRET_ID", "TENCENTCLOUD_SECRET_KEY", "WESHOP_COS_BUCKET", "WESHOP_COS_REGION", "WESHOP_COS_PREFIX", "WESHOP_MEDIA_BASE_URL"];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) throw new Error(`Missing private configuration: ${missing.join(", ")}`);

const bucket = process.env.WESHOP_COS_BUCKET;
const region = process.env.WESHOP_COS_REGION;
const prefix = process.env.WESHOP_COS_PREFIX.replace(/^\/+|\/+$/g, "");
const baseUrl = process.env.WESHOP_MEDIA_BASE_URL.replace(/\/+$/g, "");
if (bucket !== "txt2img-1322216870" || region !== "ap-shanghai" || prefix !== "desktop") {
  throw new Error("Configured COS target does not match the reviewed txt2img-1322216870/ap-shanghai/desktop scope.");
}

const suffix = sourceIndex === undefined ? "" : `-${sourceIndex}`;
const filename = `${skillId}${suffix}${extension}`;
const key = `${prefix}/${media.directory}/${filename}`;
const publicUrl = `${baseUrl}/${media.directory}/${filename}`;
const size = statSync(input).size;

async function sha256File(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) hash.update(chunk);
  return hash.digest("hex");
}

async function sha256Response(response) {
  const hash = createHash("sha256");
  for await (const chunk of response.body) hash.update(chunk);
  return hash.digest("hex");
}

const sha256 = await sha256File(input);

console.log(JSON.stringify({ dryRun, bucket, region, key, publicUrl, input, size, sha256 }, null, 2));
if (dryRun) process.exit(0);

const contentTypes = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".gif": "image/gif", ".avif": "image/avif", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".webm": "video/webm",
};
const cos = new COS({ SecretId: process.env.TENCENTCLOUD_SECRET_ID, SecretKey: process.env.TENCENTCLOUD_SECRET_KEY });

await new Promise((resolveUpload, rejectUpload) => {
  cos.uploadFile({
    Bucket: bucket,
    Region: region,
    Key: key,
    FilePath: input,
    ContentType: contentTypes[extension],
    CacheControl: "public, max-age=31536000, immutable",
    SliceSize: 5 * 1024 * 1024,
  }, (error, data) => error ? rejectUpload(error) : resolveUpload(data));
});

const head = await new Promise((resolveHead, rejectHead) => {
  cos.headObject({ Bucket: bucket, Region: region, Key: key }, (error, data) => error ? rejectHead(error) : resolveHead(data));
});
const remoteSize = Number(head.headers?.["content-length"] ?? head.headers?.["Content-Length"]);
if (Number.isFinite(remoteSize) && remoteSize !== size) throw new Error(`COS size mismatch: local ${size}, remote ${remoteSize}.`);

const separator = publicUrl.includes("?") ? "&" : "?";
const publicResponse = await fetch(`${publicUrl}${separator}verify=${Date.now()}`, { cache: "no-store" });
if (!publicResponse.ok) throw new Error(`Public URL check failed: HTTP ${publicResponse.status}.`);
const publicSha256 = await sha256Response(publicResponse);
if (publicSha256 !== sha256) throw new Error(`Public URL content mismatch: expected ${sha256}, received ${publicSha256}.`);

console.log(JSON.stringify({ status: "uploaded-and-verified", key, publicUrl, size, sha256 }, null, 2));
