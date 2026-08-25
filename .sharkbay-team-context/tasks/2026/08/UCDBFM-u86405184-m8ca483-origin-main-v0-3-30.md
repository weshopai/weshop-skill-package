---
kind: sharkbay_task
taskId: UCDBFM-u86405184-m8ca483
taskTag: UCDBFM
mode: task
title: 基于 origin/main 发布 v0.3.30
status: completed
actor: Jason12196
githubUserId: 86405184
machine: 8ca483
agent: Codex GPT-5.6
sessionId: 01a03819-1108-7a31-9491-7c839651a1d8
branch: main
createdAt: 2026-08-25T09:16:38Z
updatedAt: 2026-08-25T09:19:31Z
completedAt: 2026-08-25T09:19:31Z
commits:
  - d62e67d570994263661d799bf17d91e674092452
---

## Summary

基于隔离 worktree 中的 `origin/main@317d6e5` 发布稳定版本 `v0.3.30`，未包含主工作区未完成改动。

## Files

- `package.json`
- `package-lock.json`
- `.sharkbay/tasks/UCDBFM-u86405184-m8ca483-origin-main-v0-3-30.md`

## Work

- 在 `/tmp/weshop-skill-release.7u40RK` worktree 中从 `origin/main` 创建发布分支。
- 将包版本从 `0.3.29` 升至 `0.3.30`，提交 `d62e67d` 并推送至 `origin/main`。
- 通过 `Publish stable release` 工作流发布 npm 包、稳定 tag 与 GitHub Release。

## Verification

- 隔离 worktree：`npm ci`、`npm --prefix web ci`、`npm run check`、`npm run web:build`、`npm run package:check`、`git diff --check` 均通过。
- GitHub Actions [32831226762](https://github.com/weshopai/weshop-skill-pakage/actions/runs/32831226762) 成功。
- npm `weshop-skill-package@0.3.30`、GitHub Release `v0.3.30`、`origin/main` 均验证指向 `d62e67d`。

## Notes

- 主工作区保持原有未完成改动；发布未包含它们。
- Created locally; SharkBay owns synchronization to team context.
