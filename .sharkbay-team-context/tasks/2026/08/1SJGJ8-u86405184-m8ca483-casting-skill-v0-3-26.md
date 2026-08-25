---
kind: sharkbay_task
taskId: 1SJGJ8-u86405184-m8ca483
taskTag: 1SJGJ8
mode: task
title: 发布 Casting Skill v0.3.26
status: completed
actor: Jason12196
githubUserId: 86405184
machine: 8ca483
agent: Codex GPT-5.6
sessionId: 01a03757-d716-7433-bcad-f3d165df0e65
branch: codex/add-tool-call-assembly
createdAt: 2026-08-25T05:34:00Z
updatedAt: 2026-08-25T05:36:17Z
completedAt: 2026-08-25T05:36:17Z
commits:
  - 3a24d09
---

## Summary

发布包含 Casting 调用名改动的稳定版本 `v0.3.26`，使 npm 包与 GitHub Release 保持同一版本。

## Files

- package.json
- package-lock.json
- .sharkbay/tasks/1SJGJ8-u86405184-m8ca483-casting-skill-v0-3-26.md

## Work

- 从 `origin/main` 创建干净发布分支，仅摘取 Casting 的两次相关提交，避免将无关的 `4123f27` 纳入本次 Release。
- 将 package 和 lockfile 从 `0.3.25` 升至 `0.3.26`；发布工作流将负责 npm、tag 和 GitHub Release。

## Verification

- 已验证源提交可从 `origin/main` 干净应用。
- 通过 `npm test`（85 tests）、`npm run maintainers:validate`、`npm run web:build` 和 `npm run package:check`。
- GitHub Actions `Publish stable release` #32813419809 成功。

## Notes

- 发布工作流在 `main` 的 `3a24d09` 上创建 `v0.3.26`；npm 已验证为 `0.3.26`，GitHub Release 已公开发布。
