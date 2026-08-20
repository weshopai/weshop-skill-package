# External Skill intake: vox-explainer-skill

## Provenance

- Source: https://github.com/CK42BB/vox-explainer-skill
- Source revision: 7003225dc3ed1dee9e2ef8b91b05b82c04691aa9
- Author or organization: Kingsley
- License: MIT
- Reuse mode: adapted
- Reviewed date: 2026-08-20
- Files inspected: `LICENSE`, `README.md`, `SKILL.md`, and the Vox-style, Atlas Cloud, and ffmpeg references

## Permission decision

- License evidence: Repository-root MIT license, copyright 2026 Kingsley
- Required notices: Preserve the complete MIT notice in an adapted Skill
- Material allowed to reuse: Narration-first timing, beat manifest, visual anchor, per-beat assets, deterministic assembly, subtitles, ducking, and stage-local repair
- Material that must be independently authored: Neutral explainer grammar, factual sourcing, WeShop routes, supported audio boundary, and execution safety
- Decision: Adapt the production pattern without the Vox name/look or Atlas implementation

## Product decomposition

- User-visible outcomes: One researched, narrated, subtitled short explainer video
- Required inputs: Topic/source, audience, angle, duration, language, ratio, and factual/citation requirements
- Optional inputs: Visual style, supplied narration/music, brand rules, references, and CTA
- External AI operations: Upstream TTS, image, animation, and music; substitute only supported WeShop image/video operations
- Deterministic operations: Fact ledger, script beats, timing, subtitle file, clip conformity, assembly, mix, and QC
- State, chaining, polling, and publication: Approve script/narration timing before heavy media spend; one operation per visual/clip; no automatic publication
- Preservation and quality claims: Fact traceability, one idea per beat, stable visual system, narration/visual/subtitle sync, intelligibility, and exact duration

## Package decision

- Existing Atom updates: None
- New Atom candidates: `make-explainer-video`
- Router compositions: Research/script → keyframes → per-beat video → supplied/approved audio → combine/edit
- Rejected or unsupported behavior: Named-brand style imitation, Atlas credentials, stale models/costs, unsupported standalone TTS/music, and automatic paid fan-out
- Promotion decision and rationale: Promote the stable final explainer deliverable while keeping media operations delegated and factual review explicit

## Security review

- Secret and environment access: Upstream `ATLASCLOUD_API_KEY` is not retained
- Remote domains and uploads: No Atlas calls; authorized assets use WeShop
- Installation and executable code: No upstream code executed or installed
- Retry and provider-spend behavior: One recorded operation per beat asset; retry only affected failed/rejected beats
- Unsafe or removed behavior: Remove cost promises, unverified endpoints, named-brand imitation, and automatic audio generation

## Validation evidence

- Official WeShop schema checked: Current image/video/assembly routes checked; standalone audio remains unsupported
- Representative execution: Not authorized or not run
- Acceptance result: New Atom validation pending
- Attribution packaged: Planned with `make-explainer-video`
