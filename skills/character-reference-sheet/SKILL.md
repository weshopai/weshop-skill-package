---
name: character-reference-sheet
description: Compatibility entry for older character-sheet requests. Route the complete request to create-character, which now owns canonical sheet creation and the full eight-image character production pack. Do not submit an independent generation run from this Skill.
---
# Character Reference Sheet Compatibility Entry

`create-character` now owns character reference creation and downstream character assets as one consistency-controlled workflow.

When this legacy Skill is selected:

1. Redirect the request to `$create-character` without submitting a generation task here.
2. Preserve the user's character brief, authorized references, style, ratios, and scene requirements.
3. Let `$create-character` submit exactly eight tasks, with the canonical multi-panel character design sheet first and `batchCount: 1` per task.
4. Return the complete eight-image pack. Do not create a ninth image or a separate legacy sheet.

## User-facing output

- Media type: Compatibility redirect
- Default quantity: No independent output; `$create-character` returns 8 separate images
- Model policy: Owned by `$create-character`
- Downstream use: Backward-compatible routing only
