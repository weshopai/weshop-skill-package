# API and routing

## WeShop AI Pose

Verified agent: `aipose` v1.0.

| Field | Required | Rule |
| --- | --- | --- |
| `input.originalImage` | Yes | One URL containing one already-dressed person. |
| `params.originalImage` | Yes | Repeat the same source URL. |
| `params.textDescription` | Yes | One atomic target-pose instruction plus preservation locks. |
| `params.generateVersion` | Yes by Skill policy | Always submit `pro`. The 2026-08-19 smoke executions normalized this to `recommended` in returned execution metadata; treat that as the API's canonical pro label, not a downgrade. |
| `params.batchCount` | Yes by Skill policy | Always `1`; run named poses separately. |

The verified contract has no target-pose image, pose skeleton, mask, negative Prompt, scene, or location parameter. Do not invent these fields.

## Routing

| Inputs | Route |
| --- | --- |
| Dressed person plus target pose in words | `aipose` pro |
| Dressed person plus supplied pose-reference image | GPT Image 2 medium/2K with both references |
| Garment plus person | Virtual Try-On |
| Dressed person plus new model | Fashion Model Replacement |
| General campaign reshoot with new scene/art direction | Fashion Photoshoot |

For GPT Image 2, bind Image 1 as appearance/scene truth and Image 2 only as pose geometry. Do not inherit the pose reference's identity, clothing, background, lighting, or camera treatment.
