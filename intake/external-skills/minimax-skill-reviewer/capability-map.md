# WeShop capability substitution: MiniMax skill-reviewer

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mechanical validation | MiniMax Hub validation scripts | Local Skill directory | Bundled local custom-Skill validator | None | Validate package-native frontmatter, references, placeholders, and safety markers | Does not validate MiniMax market metadata | Package Skill format and quick validator |
| Semantic review | MiniMax skill-reviewer | Skill text and market rules | Current Agent reasoning against WeShop conventions | None | Evaluate discovery, similar-Skill boundaries, workflow, execution route, acceptance, and security | No Hub score or market category checks | Maintainer guides and Router policy |

## Deterministic operations retained locally

- Read-only JSON report for structural blockers and warnings.

## Unsupported parity

- MiniMax market metadata, tag enums, bilingual field parity, and marketplace submission checks.

## Proposed Atom boundaries

- Reviewer reports `Pass`, `Revise`, or `Reject`; it never edits or installs.
