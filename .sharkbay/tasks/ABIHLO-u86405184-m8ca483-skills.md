---
kind: sharkbay_task
taskId: ABIHLO-u86405184-m8ca483
taskTag: ABIHLO
mode: task
title: 为精选 Skills 添加独立封面
status: active
actor: Jason12196
githubUserId: 86405184
machine: 8ca483
agent: Codex GPT-5.6
sessionId: 01a03777-e2a6-74c0-bf6f-66584ac9e674
branch: codex/release-casting-v0-3-26
createdAt: 2026-08-25T06:09:36Z
updatedAt: 2026-08-25T06:09:48Z
---

## Summary

Add maintained Featured metadata and a dedicated visual cover for each selected Skill in the visual catalog.

## Files

- skills/casting/SKILL.md
- skills/change-pose/SKILL.md
- skills/make-music-video/SKILL.md
- skills/poster-design/SKILL.md
- skills/remove-background/SKILL.md
- skills/virtual-try-on/SKILL.md
- web/public/skill-covers/casting.png
- web/public/skill-covers/change-pose.png
- web/public/skill-covers/make-music-video.png
- web/public/skill-covers/poster-design.png
- web/public/skill-covers/remove-background.png
- web/public/skill-covers/virtual-try-on.png
- web/scripts/sync-skill-catalog.mjs
- web/src/App.tsx
- web/src/styles.css

## Work

- Added the explicit yes/no Featured field, a Featured catalog filter, and featured-first ordering without changing runtime intent-match scores.
- Migrated the existing Canvas Casting preview and generated five non-reused, Skill-specific covers; image editing Skills use before/after treatment.
- Added validated Cover image metadata and rendering for public catalog images.

## Verification

- npm run web:build
- git diff --check
- Local Vite preview responded HTTP 200 at http://127.0.0.1:5173/.

## Notes

- This CP contains only the listed catalog, UI, generated-cover, and task-record files.
