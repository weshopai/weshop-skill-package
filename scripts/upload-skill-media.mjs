#!/usr/bin/env node

import { createHash } from "node:crypto";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { extname, resolve } from "node:path";
import COS from "cos-nodejs-sdk-v5";

const usage = "npm run media:upload -- <cover|source|video> <skill-id> <file> [--index <n>] [--market <cn|global|both>] [--dry-run]";
const args = process.argv.slice(2);
const dryRunIndex = args.indexOf("--dry-run");
const dryRun = dryRunIndex >= 0;
if (dryRun) args.splice(dryRunIndex, 1);
const marketIndex = args.indexOf("--market");
const market = marketIndex >= 0 ? args[marketIndex + 1] : "global";
if (marketIndex >= 0) args.splice(marketIndex, 2);
if (!["cn", "global", "both"].includes(market)) throw new Error(`--market must be cn, global, or both. ${usage}`);
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
const targetDefinitions = {
  cn: {
    bucket: process.env.WESHOP_COS_BUCKET_CN || "txt2img-1322216870",
    region: process.env.WESHOP_COS_REGION_CN || "ap-shanghai",
    prefix: process.env.WESHOP_COS_PREFIX_CN || process.env.WESHOP_COS_PREFIX || "desktop",
    baseUrl: process.env.WESHOP_MEDIA_BASE_URL_CN,
  },
  global: {
    bucket: process.env.WESHOP_COS_BUCKET_GLOBAL || "weshop-ai-image-va-1322216870",
    region: process.env.WESHOP_COS_REGION_GLOBAL || "na-ashburn",
    prefix: process.env.WESHOP_COS_PREFIX_GLOBAL || process.env.WESHOP_COS_PREFIX || "desktop",
    baseUrl: process.env.WESHOP_MEDIA_BASE_URL_GLOBAL || process.env.WESHOP_MEDIA_BASE_URL,
  },
};
const secretId = process.env.TENCENTCLOUD_SECRET_ID;
const secretKey = process.env.TENCENTCLOUD_SECRET_KEY;
const markets = market === "both" ? ["cn", "global"] : [market];
const targets = markets.map((name) => {
  const target = targetDefinitions[name];
  const required = ["baseUrl"];
  const missing = required.filter((key) => !target[key]);
  if (!dryRun && !secretId) missing.push("TENCENTCLOUD_SECRET_ID");
  if (!dryRun && !secretKey) missing.push("TENCENTCLOUD_SECRET_KEY");
  if (dryRun) missing.splice(0, missing.length, ...missing.filter((key) => key === "baseUrl"));
  if (missing.length) throw new Error(`Missing ${name} media configuration: ${missing.join(", ")}`);
  const expected = name === "cn"
    ? { bucket: "txt2img-1322216870", region: "ap-shanghai" }
    : { bucket: "weshop-ai-image-va-1322216870", region: "na-ashburn" };
  if (target.bucket !== expected.bucket || target.region !== expected.region) {
    throw new Error(`${name} COS target must be ${expected.bucket}/${expected.region}.`);
  }
  target.prefix = target.prefix.replace(/^\/+|\/+$/g, "");
  target.baseUrl = target.baseUrl?.replace(/\/+$/g, "");
  return { name, ...target };
});

const suffix = sourceIndex === undefined ? "" : `-${sourceIndex}`;
const filename = `${skillId}${suffix}${extension}`;
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

console.log(JSON.stringify({ dryRun, market, targets: targets.map(({ name, bucket, region, prefix, baseUrl }) => ({ name, bucket, region, prefix, baseUrl })), input, size, sha256 }, null, 2));
if (dryRun) process.exit(0);

const contentTypes = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".gif": "image/gif", ".avif": "image/avif", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".webm": "video/webm",
};
const results = [];
for (const target of targets) {
  const key = `${target.prefix}/${media.directory}/${filename}`;
  const publicUrl = `${target.baseUrl}/${media.directory}/${filename}`;
  const cos = new COS({ SecretId: secretId, SecretKey: secretKey });
  await new Promise((resolveUpload, rejectUpload) => {
    cos.uploadFile({
      Bucket: target.bucket,
      Region: target.region,
      Key: key,
      FilePath: input,
      ContentType: contentTypes[extension],
      CacheControl: "public, max-age=31536000, immutable",
      SliceSize: 5 * 1024 * 1024,
    }, (error, data) => error ? rejectUpload(error) : resolveUpload(data));
  });
  const head = await new Promise((resolveHead, rejectHead) => {
    cos.headObject({ Bucket: target.bucket, Region: target.region, Key: key }, (error, data) => error ? rejectHead(error) : resolveHead(data));
  });
  const remoteSize = Number(head.headers?.["content-length"] ?? head.headers?.["Content-Length"]);
  if (Number.isFinite(remoteSize) && remoteSize !== size) throw new Error(`${target.name} COS size mismatch: local ${size}, remote ${remoteSize}.`);
  const separator = publicUrl.includes("?") ? "&" : "?";
  const publicResponse = await fetch(`${publicUrl}${separator}verify=${Date.now()}`, { cache: "no-store" });
  if (!publicResponse.ok) throw new Error(`${target.name} public URL check failed: HTTP ${publicResponse.status}.`);
  const publicSha256 = await sha256Response(publicResponse);
  if (publicSha256 !== sha256) throw new Error(`${target.name} public URL content mismatch: expected ${sha256}, received ${publicSha256}.`);
  results.push({ market: target.name, key, publicUrl, size, sha256 });
}
console.log(JSON.stringify({ status: "uploaded-and-verified", results }, null, 2));
