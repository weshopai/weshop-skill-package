# Routing and API

## Verified endpoint

Agent: `removeBG` v1.0.

| Field | Rule |
| --- | --- |
| `input.originalImage` | Require one public source URL. |
| `originalImage` | Repeat the source URL in run parameters. |
| `maskType` | Use `autoSubjectSegment` by default or `custom` with a real mask. |
| `customMaskUrl` | Require when `maskType` is `custom`; never fabricate a URL. |
| `backgroundHex` | Use only for a requested flattened color result. It does not produce the required transparent master. |
| `backgroundId` | Required by the live endpoint. Query agent info and pass the current preset whose name is `Transparent`; verified ID `306` on 2026-08-19. Do not assume the ID is permanent. |
| `batchCount` | Use `1` for one named output. |

The endpoint has no Prompt or model-tier parameter.

Static documentation previously suggested omitting both background fields for transparency. A live run rejected that request with `INVALID_ARGUMENT: Please choose background`. Runtime agent info is authoritative for preset-backed parameters.

## Scope boundaries

- Transparent cutout: Remove Background.
- Flat solid-color background: Remove Background may provide it as an optional variant.
- Generated or supplied photographic scene replacement: route to the relevant editing or product-scene Skill.
- White-background commercial photography with relighting and presentation changes: route to White Background Product Mockup.
- User wants only a reusable mask: keep the alpha/mask artifact if the execution surface exposes it; do not claim the composited PNG is a separate mask.

## Subject policy

Treat connected accessories and intentionally held products as part of the foreground unless the user excludes them. For multiple disjoint subjects, ask which subject set to preserve only when the request and image do not make it inferable. A custom mask is a selection correction, not a license to redraw the subject.
