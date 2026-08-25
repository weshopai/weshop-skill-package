---
kind: sharkbay_task
taskId: BFUB5B-u86405184-m8ca483
taskTag: BFUB5B
mode: quick
title: 将 Casting Skill 调用名改为 casting
status: active
actor: Jason12196
githubUserId: 86405184
machine: 8ca483
agent: Codex GPT-5.6
sessionId: 01a03757-d716-7433-bcad-f3d165df0e65
branch: codex/add-tool-call-assembly
createdAt: 2026-08-25T05:28:19Z
updatedAt: 2026-08-25T05:28:19Z
---

## Summary

将角色选角 Skill 的可调用 slug 从 `casting-cn` 改为 `casting`，展示名称改为 Casting，并移除原创虚构角色限制表述。

## Files

- README.md
- skills/casting/SKILL.md
- skills/casting/references/portrait-prompt-blocks.md
- skills/casting-cn/SKILL.md (renamed)
- skills/casting-cn/references/portrait-prompt-blocks.md (renamed)
- .sharkbay/tasks/BFUB5B-u86405184-m8ca483-casting-skill-casting.md

## Work

- 将 Skill 目录和 frontmatter 名称改为 `casting`，因此实际调用改为 `/skill:casting`。
- 更新 README 清单和引用文档，保留定脸、确认闸门及安全边界。

## Verification

- `git diff --check`
- `npm run check`
- `npm run models:routing-validate`
- `npm run docs:validate`
- `npm run test:package-cli`

## Notes

- Canvas 需将 Featured 卡片和已有样品画布预填调用同步为 `casting`；既有样品资源的 `casting-cn` 元数据暂不迁移，以避免重复播种或丢失资源。
