---
kind: sharkbay_task
taskId: LOMXGE-u86405184-m8ca483
taskTag: LOMXGE
mode: task
title: 修复 Character Reference Sheet 封面并发布 v0.3.34
status: completed
actor: Jason12196
githubUserId: 86405184
machine: 8ca483
agent: Codex GPT-5.6
sessionId: 01a03819-1108-7a31-9491-7c839651a1d8
branch: main
createdAt: 2026-08-26T03:09:05Z
updatedAt: 2026-08-26T03:12:41Z
completedAt: 2026-08-26T03:12:41Z
commits:
  - bcf4543140fdd90bbf4c53c2adf4d76554c309e9
---

## Summary

修复 Character Reference Sheet 的 Catalog 封面引用，并基于最新 `origin/main` 发布稳定版 `v0.3.34`。

## Files

- `skills/character-reference-sheet/SKILL.md`
- `catalog/skills.json`
- `package.json`
- `package-lock.json`

## Work

- 在隔离 worktree 中从 `origin/main@897965d` 创建发布分支，保护主工作区未完成改动。
- 写入 `/skill-covers/character-reference-sheet.png`，并同步归一化 catalog。
- 将版本从 `0.3.33` 升至 `0.3.34`，提交 `bcf4543` 并推送至 `main`。
- 触发稳定发布工作流，发布 npm 包、tag 与 GitHub Release。

## Verification

- `npm ci`、`npm --prefix web ci`、`npm run check`、`npm run web:build`、`npm run package:check`、`git diff --check` 通过。
- 构建后的 catalog 条目已验证为 `/skill-covers/character-reference-sheet.png`。
- GitHub Actions [32925514224](https://github.com/weshopai/weshop-skill-package/actions/runs/32925514224) 成功；npm `0.3.34`、Release `v0.3.34`、tag 与 `origin/main` 均指向 `bcf4543`。

## Notes

- 主工作区未完成改动未参与发布。
- Created locally; SharkBay owns synchronization to team context.
