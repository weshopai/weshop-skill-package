# Comic storyboard manifest

Use this structure as the handoff contract. JSON is preferred for machine execution; Markdown is acceptable for human review when it preserves every field.

```json
{
  "project": "Title",
  "logline": "One-sentence dramatic spine",
  "language": "zh-CN",
  "readingDirection": "left-to-right",
  "masterPageRatio": "3:4",
  "visualStylePrompt": "English image-style description",
  "globalLayoutStrategy": "Pacing and page-turn logic",
  "characters": [
    {
      "id": "char-01",
      "name": "Name",
      "role": "protagonist",
      "species": "human",
      "apparentAge": "young adult",
      "identityAnchors": ["observable face/body traits"],
      "hair": "stable construction and color",
      "outfit": "stable pieces, construction, material, and palette",
      "signatureFeature": "one recognition anchor",
      "personality": ["playful", "guarded"],
      "mustNotChange": ["identity and wardrobe invariants"]
    }
  ],
  "pages": [
    {
      "pageNumber": 1,
      "storyBeat": "Purpose of this page in the arc",
      "panelCount": 3,
      "layoutLogic": "Panel hierarchy, reading order, and page-turn setup",
      "continuityFromPrevious": ["state carried into this page"],
      "panels": [
        {
          "panelNumber": 1,
          "characters": ["char-01"],
          "action": "Visible action",
          "setting": "Observable environment",
          "shot": "wide",
          "camera": "eye level",
          "expression": "specific readable emotion",
          "continuityLocks": ["prop in left hand"],
          "dialogue": [
            { "speaker": "char-01", "text": "Exact approved line", "kind": "speech" }
          ]
        }
      ]
    }
  ]
}
```

## Validation

- `pages.length` equals the requested page count; numbering starts at 1 with no gaps or duplicates.
- `panels.length` equals `panelCount`; panel numbering is contiguous inside each page.
- Every referenced character ID exists in `characters`.
- Dialogue text is exact, assigned to a character or `narrator`, and carries `speech`, `thought`, or `caption` as its kind.
- Each page advances or intentionally holds the dramatic beat. Adjacent pages state carried props, injuries, time, weather, wardrobe changes, and location transitions.
- No panel asks one image to show incompatible moments. Split simultaneous story beats when action order matters.
