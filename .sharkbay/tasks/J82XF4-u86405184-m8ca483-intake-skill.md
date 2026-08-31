---
kind: sharkbay_task
taskId: J82XF4-u86405184-m8ca483
taskTag: J82XF4
mode: task
title: Intake 文章手绘正文插图 Skill
status: active
actor: Jason12196
githubUserId: 86405184
machine: 8ca483
agent: Codex GPT-5.6
sessionId: 01a05649-44f4-7fb3-ad1b-ffc559efb857
branch: main
createdAt: 2026-08-31T05:49:55Z
updatedAt: 2026-08-31T05:50:04Z
---

## Summary

将 Ian Xiaohei Illustrations 以带归因的原生 WeShop Atom intake 到 Package，并明确多图使用时优先提供完整文章。

## Files

- README.md
- catalog/skills.json
- intake/external-skills/ian-xiaohei-illustrations/intake.md
- intake/external-skills/ian-xiaohei-illustrations/capability-map.md
- skills/article-handdrawn-illustrations/SKILL.md
- skills/article-handdrawn-illustrations/agents/openai.yaml
- skills/article-handdrawn-illustrations/references/source-attribution.md
- .sharkbay/tasks/J82XF4-u86405184-m8ca483-intake-skill.md

## Work

- 固定上游 MIT 来源到提交 `91b560849e8f883922cc2fa8a358a668caa94105`，不复制示例图片和二维码素材。
- 新增 `article-handdrawn-illustrations`，与信息图、社交轮播和图片型演示文稿保持独立边界。
- 客户端使用说明建议多图任务提供完整文章；单图任务可仅提供一个明确观点。

## Verification

- `npm run skills:intake -- validate ian-xiaohei-illustrations`
- Skill Creator `quick_validate.py`（临时 PyYAML 环境）
- `npm --prefix web run catalog:check`
- `npm run docs:validate`
- `npm run maintainers:validate`
- `npm run package:check`
- `npm test`
- `git diff --check`

## Notes

- Created locally; SharkBay owns synchronization to team context.
- 用户将自行制作正式封面；本次保留 Package fallback cover。
