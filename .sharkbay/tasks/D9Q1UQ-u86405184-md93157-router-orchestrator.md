---
kind: sharkbay_task
taskId: D9Q1UQ-u86405184-md93157
taskTag: D9Q1UQ
mode: task
title: 重构 Router 与多步骤编排器并发布
status: active
actor: Jason12196
githubUserId: 86405184
machine: d93157
agent: Codex GPT-5.6
sessionId: 01a02d9b-eb62-7dc3-8fea-1ef9f3b47658
branch: codex/skill-planning-decision
createdAt: 2026-08-23T08:39:00Z
updatedAt: 2026-08-23T08:39:35Z
---

## Summary

将包内唯一 Router 与多步骤编排器拆分为明确的上下游职责，并准备发布补丁版本。

## Files

- `README.md`
- `package.json`
- `src/router.ts`
- `src/router.test.ts`
- `src/multi-step-orchestrator.ts`
- `src/multi-step-orchestrator.test.ts`
- `src/legacy-dispatch.ts`
- `src/legacy-dispatch.test.ts`
- `src/index.ts`
- `skills/weshop-router/SKILL.md`
- `skills/orchestrate-multi-step-workflow/`
- `scripts/validate-readme.mjs`
- `scripts/validate-model-routing.mjs`
- `scripts/validate-npm-package.mjs`
- `web/scripts/sync-skill-catalog.mjs`
- `model-selection-policy.md`
- `skills/generate-video/SKILL.md`
- `.sharkbay/tasks/D9Q1UQ-u86405184-md93157-router-orchestrator.md`

## Work

- 将 `weshop-router` 定义为包内唯一 Router：记录轻量意图、评分所有合理 Atom 候选，并直达最高分 Atom。
- 将多步骤 DAG、产物交接和最终验收独立为 `orchestrate-multi-step-workflow`，禁止其处理单 Atom 请求。
- 新增 `validateRouterDecision`，拒绝低分 Atom、未登记候选、研究型直达请求，以及把编排器当作 Atom 的错误决策。
- 将旧的静态分发代码降级为 `legacy-dispatch`，同步安装、文档、模型校验与网站目录规则。

## Verification

- 已通过 `npm run check`、`npm test`、`npm run docs:validate`、`npm run models:routing-validate`、`npm run package:check`、`npm run maintainers:validate`、`npm run web:build` 与 `git diff --check`。

## Notes

- 衔接已完成的 `WYXEW5-u86405184-md93157`：上一版把单 Atom 判定放进了原 `weshop-router`，本任务将它提升为唯一包内 Router，并将真正的多步骤编排单独命名。
- 用户已授权 C/P/R；完成后记录实际提交、推送与发布结果。
