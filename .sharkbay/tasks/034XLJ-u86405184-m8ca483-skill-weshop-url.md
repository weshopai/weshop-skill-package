---
kind: sharkbay_task
taskId: 034XLJ-u86405184-m8ca483
taskTag: 034XLJ
mode: task
title: Skill 媒体迁移至 WeShop 远程 URL
status: completed
actor: Jason12196
githubUserId: 86405184
machine: 8ca483
agent: Codex GPT-5.6
sessionId: 01a04242-ee29-76b3-9f74-07aeff4cf495
branch: main
createdAt: 2026-08-27T09:32:57Z
updatedAt: 2026-08-27T09:33:53Z
completedAt: 2026-08-27T09:33:53Z
commits:
  - 53d7aa2eecff9da77b8cf4279c4c55a6be0e02b4
---

## Summary

将 Catalog 的封面图、原图与视频声明统一迁移到 WeShop 托管 URL，并从 npm 发布物中移除本地媒体副本，使 Skill 元数据仍可随 npm 更新而媒体按需联网加载。

## Files

- catalog/skills.json
- docs/maintainers/adding-skills.md
- package.json
- schemas/skill-catalog.schema.json
- scripts/validate-npm-package.mjs
- skills/*/SKILL.md（本次实际修改的 111 个媒体声明文件）
- web/scripts/check-skill-catalog.mjs
- web/scripts/sync-skill-catalog.mjs

## Work

- 使用 Skill ID 作为 coverImage、sourceImage、coverVideo 的远程文件名，支持多张原图的 `-1`、`-2` 顺序后缀。
- Catalog 生成器、Schema、校验脚本和维护文档同步采用受控 HTTPS 路径；npm 包明确禁止再次包含 `runtime/skill-covers/`。
- 远端 134 张封面、49 张原图、38 个视频共 221 个资源均已验证可访问且 MIME 正确。

## Verification

- `node web/scripts/sync-skill-catalog.mjs`：生成 134 个 Skill 条目。
- `node web/scripts/check-skill-catalog.mjs`：134 个条目全部通过。
- `npm run web:build`：通过。
- `npm run package:check`：通过，0.3.47 发布物 337 个文件，压缩 307466 bytes、解压 1125499 bytes。
- `npm run check`：通过。
- `git diff --check`：通过。

## Notes

- 本次仅 CP，不提升 npm 版本、不发布 npm；远程媒体元数据将在后续版本发布时进入 npm。
- SharkBay 负责将本地任务同步到团队上下文。
