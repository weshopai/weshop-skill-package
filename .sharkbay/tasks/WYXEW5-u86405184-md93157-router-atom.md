---
kind: sharkbay_task
taskId: WYXEW5-u86405184-md93157
taskTag: WYXEW5
mode: task
title: 完善 Router 单 Atom 与多步骤判定并发布
status: completed
actor: Jason12196
githubUserId: 86405184
machine: d93157
agent: Codex GPT-5.6
sessionId: 01a02a25-eb5b-7fc3-8507-f2cffc29bf1e
branch: codex/skill-planning-decision
createdAt: 2026-08-23T07:51:48Z
updatedAt: 2026-08-23T07:51:53Z
completedAt: 2026-08-23T07:51:53Z
commits:
  - c22c4e5927369a79bef7f55303129dda11a1331a
---

## Summary

为 Router 增加单一 Atom 与多步骤编排的显式判定，并发布 `weshop-skill-package@0.3.13` 与 GitHub Release `v0.3.13`。

## Files

- `src/adaptive-router.ts`
- `src/adaptive-router.test.ts`
- `skills/weshop-router/SKILL.md`
- `skills/weshop-router/references/adaptive-planning.md`
- `package.json`
- `package-lock.json`
- `handoff.md`
- `.sharkbay/tasks/WYXEW5-u86405184-md93157-router-atom.md`

## Work

- 在执行 Skill 节点候选匹配前，新增 `planning.shape`、`planning.reason` 与 `planning.clarificationRequired`。
- 单一 Atom 请求必须执行一个独立 Skill 节点；多步骤请求必须具有两个以上真实步骤，并分别校验依赖链、研究和歧义澄清。
- 保持每个 Skill 节点的候选清单与最高 `intentMatchScore` 选择约束，不改变 Canvas。
- 将版本提升到 `0.3.13`，提交 `c22c4e59` 并推送至 `weshopai/main`；已成功发布 npm 包和 GitHub Release。

## Verification

- `npm test`：73/73 通过。
- `npm run check`、`npm run models:validate`、`npm run models:routing-validate`、`npm run docs:validate`、`npm run maintainers:validate`、`npm run web:build`、`npm run package:check` 通过。
- `git diff --check` 通过。
- GitHub Actions 发布工作流 `32626559901` 成功；npm `latest` 为 `0.3.13`，tag 与 Release 均指向 `c22c4e59`。

## Notes

- 本地 `.sharkbay/` 受 `.git/info/exclude` 排除；本记录按用户要求使用强制暂存后推送到 `weshopai/weshop-skill-pakage`。
- 目标远端的 `sharkbay-team-context` 分支当前没有既有任务记录。
