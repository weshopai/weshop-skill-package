# Poster Prompt Compiler

Use the full brief as internal reasoning. Submit compact natural prose to the image model; never serialize the brief as a labeled specification sheet.

## Build the visual idea first

Resolve these internally:

1. What should viewers understand in one second?
2. What single visible event makes that idea tangible?
3. How do the subject and title form one composition?
4. What reference details are truly identity-critical?
5. Which two or three visual traits make this direction distinctive?

Translate claims into imageable devices:

| Abstract message | Weak default | Stronger visible device |
| --- | --- | --- |
| Comfort | airy background, soft curves | sole visibly compressing a sculptural cushion; shoe suspended in a soft tension field; laces and fabric reacting to a gentle landing |
| Speed | motion blur | repeated heel-strike rhythm, diagonal track incision, stretched shadow, or a subject breaking a graphic boundary |
| Precision | clean premium | calibrated alignment marks, exact modular cuts, controlled macro detail, or one surgical beam defining the form |
| Freshness | green gradient | condensation, cut citrus light, translucent cold surface, or crisp botanical shadow |
| Night | dark luxury | eclipse, narrow colored flare, reflective wet plane, or light emerging from a physical opening |

Avoid the weak default unless the user explicitly wants a conventional marketplace treatment.

## Submitted Prompt shape

Write one compact paragraph, normally 60–120 English words or an equivalently concise prompt in another language:

```text
Design one [ratio] [poster kind] around [subject/reference]. Render “[exact copy]” exactly once and no other added copy. Make [message] visible through [one concrete visual event]. [Subject-title composition and crop]. Preserve [short identity lock]. Use [2–3 specific art-direction traits]. No [the 3–6 most likely failures].
```

Aspect ratio, resolution, quality, and batch count belong in API parameters and should not be repeated unless visually relevant.

## Compression rules

- Remove labels such as `Output:`, `Objective:`, `Subject:`, `Art direction:`, `Composition:`, and `Exclude:` before submission.
- State a requirement once. Do not repeat “focal,” “dominant,” “first-read,” and “clear hierarchy” as separate clauses.
- Preserve product construction with one grouped lock. Enumerate details only when a specific detail is easy to lose.
- Distinguish supplied product markings from poster copy. Preserve genuine product markings visually; “no other added copy” applies to newly designed poster text.
- Do not ask a model to preserve “visible text” generically when the reference contains unreliable or unwanted text.
- Prefer one unusual visual device over a list of safe adjectives such as polished, premium, clean, modern, soft, airy, elegant, and professional.
- Keep negative constraints short and recipe-specific. Long banned lists dilute the positive composition.

## Copy policy

- Short title: generate it in-image and integrate it with the subject.
- Medium copy: prioritize title and essential details; omit decorative microtype.
- Long, legal, or price-sensitive copy: generate the visual field with reserved zones, then use deterministic typography if the user permits compositing.
- If exact copy fails once, simplify everything except the title before changing models.

## Reference policy

- Product/identity/logo reference: preserve recognizable construction and genuine markings; do not redesign.
- Composition reference: borrow spatial logic, not subjects or words.
- Style reference: extract scale, rhythm, type behavior, palette logic, and material process; do not request an exact living-artist imitation.
- Source photo: choose literal preservation or semantic reinterpretation before prompting.
