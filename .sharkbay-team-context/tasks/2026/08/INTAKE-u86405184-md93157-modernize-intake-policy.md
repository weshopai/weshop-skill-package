---
kind: sharkbay_task
taskId: INTAKE-u86405184-md93157
taskTag: INTAKE
mode: task
title: 更新外部 Skill Intake 机制
status: completed
actor: Jason12196
githubUserId: 86405184
machine: d93157
agent: Codex GPT-5.6
sessionId: 01a02eed-98da-7070-85da-f0909e33c759
branch: codex/skill-planning-decision
createdAt: 2026-08-23T14:19:37Z
updatedAt: 2026-08-23T14:30:45Z
completedAt: 2026-08-23T14:28:09Z
commits:
  - 125c55b4
---

## Summary

将外部 Skill Intake 更新为自主的 active/inactive 生命周期，并以模糊语义路由测试保障独立边界。

## Files

- scripts/create-skill-intake.mjs
- scripts/skill-intake.test.mjs
- package.json
- package-lock.json
- intake/external-skills/README.md
- docs/maintainers/importing-external-projects.md
- docs/maintainers/README.md
- handoff.md

## Work

- 将人工审批和 pending-review 模板替换为 version-2 `active` 生命周期记录；`inactive` 用于关闭来源结果，同时保留证据。
- 将未标记版本的 Intake 定义为历史归档证据，禁止将旧 merge-era 表述复用为当前策略。
- 新增 `skills:intake validate <slug>`，要求完整能力映射、明确相邻 Skill 边界，以及三条候选命中和三条已安装邻居命中的模糊语义案例。

## Verification

- `npm test`
- `npm run models:validate`
- `npm run models:routing-validate`
- `npm run docs:validate`
- `npm run maintainers:validate`
- `npm run web:build`
- `git diff --check`
- 稳定版发布工作流 `32645595495` 成功；GitHub Release `v0.3.15` 和 npm 包 `weshop-skill-package@0.3.15` 均指向提交 `125c55b4`。

## Notes

- 来源可复现性和历史记录逐条治理由用户明确暂缓；本任务未执行付费调用。
