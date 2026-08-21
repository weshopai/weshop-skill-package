# WeShop capability substitution: MiniMax skill-creator

| External behavior | Original provider/model | Inputs and constraints | Proposed WeShop Agent/model | Native WeShop fields | Prompt adaptation | Fidelity gaps | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Author a Skill | MiniMax media-agent | Conversation or brief | Current Agent reasoning; no paid model route | None | Convert user intent into the package's `SKILL.md` contract | No MiniMax bilingual/market metadata | Reviewed source files and package conventions |
| Validate a Skill | MiniMax Hub validators | Skill directory | Local deterministic validator plus `review-custom-skill` | None | Check structure, references, discovery boundary, execution and security contracts | Semantic review remains Agent-authored | Existing quick validator and maintainer gates |
| Save and reload | MiniMax Hub user directory and reload tool | Approved Skill | Explicit copy to the active Agent's user Skill directory | None | Keep draft isolated until approval | Reload behavior varies by harness | Existing package installer target conventions |

## Deterministic operations retained locally

- Create a user-owned isolated draft and intake worksheet.
- Validate frontmatter, directory/name alignment, placeholders, referenced resources, and secret-risk text.
- Install only after a passing review and explicit user confirmation.

## Unsupported parity

- MiniMax Hub Skill Plaza, Hub directory precedence, Hub reload, market metadata, and marketplace submission.

## Proposed Atom boundaries

- `create-custom-skill` creates or revises one user-owned draft.
- `review-custom-skill` independently reviews an existing draft and gates installation.
